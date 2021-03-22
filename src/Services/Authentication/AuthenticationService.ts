import 'linq4js';
import jwt_decode, { JwtPayload } from 'jwt-decode';
import RequestService from '../Request/RequestService';
import { UserInfo } from '@/Models/User';
import { LoginCredentials } from '@/Models/Auth/Credentials';
import { ERequestServiceConfig } from '../Request/types';
import { TokenInfoDTO, TokenInfoStorage } from '@/Models/Auth/TokenInfo';
import { ApiResponse, ErrorResponse } from '@/Common/Api';


class AuthenticationService {
    private static readonly _errorMessage: string = "Algo inesperado deu errado, verifique sua conexão e os dados informados e tente novamente.";
    private static _singletonInstance: AuthenticationService | null = null;
    private _userInfo: UserInfo;
    private _authToken: string = "";
    private _expiresIn: number = 0;
    private _isAuthenticated: boolean = false;
    private ReqService: RequestService;

    private LoadUser(token?: JwtPayload & { display_name: string, location: string, email: string, birthdate: string, id: string }) {
        try {
            let decodedToken = token ?? this.decode(this._authToken);

            this._userInfo = new UserInfo(
                decodedToken.id,
                decodedToken.display_name,
                decodedToken.sub ?? '',
                decodedToken.email,
                decodedToken.birthdate,
                decodedToken.location
            );
            console.log(this._userInfo)
            return this._userInfo;
        } catch (e) {
            console.log(e);
            throw e;
        }
    }

    private RevokeCredentials() {
        this._isAuthenticated = false;
        this._authToken = '';
        this._expiresIn = 0;
        this._userInfo = new UserInfo();
        sessionStorage.clear();
    }

    private decode(token: string) {
        return jwt_decode<
            JwtPayload &
            { display_name: string, location: string, email: string, birthdate: string, id: string }>(token)
    }

    private ThrowErrorResponse(e: unknown) {
        if((e as Error).message === "Failed to fetch") {
            throw new ErrorResponse("A conexão com o servidor se perdeu, verifique se há conexão com a internet e tente novamente.", 0);
        }

        if(e instanceof ErrorResponse) {
            throw new ErrorResponse(e.Message, e.StatusCode, e.Details);
        } else {
            throw new ErrorResponse(`Algo deu errado : ${(e as Error).message} : ${(e as Error).stack}`, 0);
        }
    }

    constructor() {
        AuthenticationService._singletonInstance = this;
        this.ReqService = new RequestService(ERequestServiceConfig.AnonymousJsonDefault);
        this._userInfo = new UserInfo();
    }

    public LoadAuth = () => {
        const storedToken = sessionStorage.getItem("LFwaATSeSt") ?? '';
        console.log(storedToken)
        if(storedToken) {
            let tokenInfo = (JSON.parse(storedToken) || { }) as TokenInfoStorage;
            console.log(tokenInfo && tokenInfo.ValidTo && (new Date().getTime() < tokenInfo.ValidTo))
            if(tokenInfo && tokenInfo.ValidTo && (new Date().getTime() < tokenInfo.ValidTo)) {
                this._authToken = tokenInfo.AccessToken;
                this._expiresIn = tokenInfo.ValidTo;
                this._isAuthenticated = true;
                return this.LoadUser();
            }
        }

        return new UserInfo();
    }

    public static readonly AuthEndpoint: string = 'https://localhost:5001/api/auth/';

    public static get Instance() {
        if(AuthenticationService._singletonInstance === null) {
            AuthenticationService._singletonInstance = new AuthenticationService();
        }

        return AuthenticationService._singletonInstance as AuthenticationService;
    }

    public get IsAuthenticated() {
        return (this._isAuthenticated = !!this._authToken && new Date().getTime() < this._expiresIn);
    }

    public get Token() {
        return this.IsAuthenticated ? this._authToken : '';
    }

    public get UserInfo() {
        return this._userInfo;
    }

    public Login = async (Login: string, Password: string) => {
        try {
            let login: LoginCredentials = {
                Login,
                Password
            };

            let tokenInfo = await this.ReqService.PostJson<LoginCredentials, TokenInfoDTO>('auth/Login', login);
            
            const ValidTo = Date.parse(tokenInfo.ValidTo);
            this._authToken = tokenInfo.AccessToken;
            this._expiresIn = ValidTo;
            sessionStorage.setItem("LFwaATSeSt", JSON.stringify({ AccessToken: tokenInfo.AccessToken, ValidTo } as TokenInfoStorage));
            let jwtPayload = this.decode(tokenInfo.AccessToken);
            localStorage.setItem("LFwaRTLoSt", tokenInfo.RefreshToken);
            localStorage.setItem("LFwaULSt", jwtPayload.sub ?? "");
            this._isAuthenticated = true;
            return this.LoadUser(jwtPayload);
        } catch(err) {
            console.log(err);

            this.RevokeCredentials();

            throw this.ThrowErrorResponse(err);
        }
    }

    public Refresh = async () => {
        try {            
            let response = await fetch(
                AuthenticationService.AuthEndpoint + 'Refresh', 
                {
                    method: 'POST',
                    credentials: 'include',
                    headers: new Headers([["Content-Type","application/json"]]),
                    mode: 'cors',
                    body: JSON.stringify({ UserId: localStorage.getItem("LFwaULSt") ?? '', RefreshToken: localStorage.getItem("LFwaRTLoSt") ?? '' })
                }
            );

            let tokenResponse = await response.json() as ApiResponse<TokenInfoDTO>;

            let tokenInfo = tokenResponse.Value;

            if(!tokenInfo) {
                throw new ErrorResponse("Token inválido", 500, "");
            }

            const ValidTo = Date.parse(tokenInfo.ValidTo);
            this._authToken = tokenInfo.AccessToken;
            this._expiresIn = ValidTo;
            sessionStorage.setItem("LFwaATSeSt", JSON.stringify({ AccessToken: tokenInfo.AccessToken, ValidTo } as TokenInfoStorage));
            localStorage.setItem("LFwaRTLoSt", tokenInfo.RefreshToken);
            this._isAuthenticated = true;
            return this.LoadUser();
        } catch (e) {
            console.log(e);

            this.RevokeCredentials();

            throw this.ThrowErrorResponse({ message: "Houve um erro ao tentar realizar essa ação. Você será redirecionado para o LogIn" });
        }
    }
}

export default AuthenticationService;