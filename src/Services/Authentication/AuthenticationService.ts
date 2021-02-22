import 'linq4js';
import jwt_decode, { JwtPayload } from 'jwt-decode';
import RequestService from '../Request/RequestService';
import { UserInfo } from '@/Models/User';
import { LoginCredentials } from '@/Models/Auth/Credentials';
import { ERequestServiceConfig } from '../Request/types';
import TokenInfo, { TokenInfoDTO, TokenInfoStorage } from '@/Models/Auth/TokenInfo';
import { ApiResponse, TokenResponse } from '@/Common/Api';


class AuthenticationService {
    private static readonly _errorMessage: string = "Algo inesperado deu errado, verifique sua conexão e os dados informados e tente novamente.";
    private static _singletonInstance: AuthenticationService | null = null;
    private _userInfo: UserInfo;
    private _authToken: string = "";
    private _expiresIn: number = 0;
    private _isAuthenticated: boolean = false;
    private ReqService: RequestService;

    private LoadAuth = () => {
        const storedToken = sessionStorage.getItem("LFatSt") ?? '';
         
        if(storedToken) {
            let tokenInfo = (JSON.parse(storedToken) || { }) as TokenInfoStorage;

            if(tokenInfo && tokenInfo.ValidTo && (new Date().getTime() < tokenInfo.ValidTo)) {
                this._authToken = tokenInfo.AccessToken;
                this._expiresIn = tokenInfo.ValidTo;
                this._isAuthenticated = true;
                this.LoadUser();
            }
        }
    }

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
        } catch (e) {
            console.log(e);
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

    constructor() {
        AuthenticationService._singletonInstance = this;
        this.ReqService = new RequestService(ERequestServiceConfig.AnonymousJsonDefault);
        this._userInfo = new UserInfo();
    }

    public static readonly AuthEndpoint: string = RequestService.apiUrl + 'auth/';

    public static get Instance() {
        if(AuthenticationService._singletonInstance === null) {
            AuthenticationService._singletonInstance = new AuthenticationService();
        }

        return AuthenticationService._singletonInstance as AuthenticationService;
    }

    public get IsAuthenticated() {
        return (this._isAuthenticated = !!this._authToken && new Date().getTime() / 1000 < this._expiresIn);
    }

    public get Token() {
        return this.IsAuthenticated ? this._authToken : '';
    }

    public Login = async (Login: string, Password: string, Email: string) => {
        // let errorMessage = AuthenticationService._errorMessage;

        try {
            let login: LoginCredentials = {
                Email,
                Login,
                Password
            };

            let tokenInfo = await this.ReqService.PostJson<LoginCredentials, TokenInfoDTO>('auth/Login', login);
            
            const ValidTo = Date.parse(tokenInfo.ValidTo);
            this._authToken = tokenInfo.AccessToken;
            this._expiresIn = ValidTo;
            sessionStorage.setItem("LFatSt", JSON.stringify({ AccessToken: tokenInfo.AccessToken, ValidTo } as TokenInfoStorage));
            let jwtPayload = this.decode(tokenInfo.AccessToken);
            localStorage.setItem("LFulSt", jwtPayload.sub ?? "");
            this.LoadUser(jwtPayload);
            this._isAuthenticated = true;
            return true;
        } catch(err) {
            console.log(err);

            this.RevokeCredentials();

            throw AuthenticationService._errorMessage;
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
                    body: JSON.stringify({ UserId: localStorage.getItem("LFulSt") ?? '' })
                }
            );

            let tokenResponse = await response.json() as ApiResponse<TokenInfoDTO>;

            let tokenInfo = tokenResponse.Value;

            const ValidTo = Date.parse(tokenInfo.ValidTo);
            this._authToken = tokenInfo.AccessToken;
            this._expiresIn = ValidTo;
            sessionStorage.setItem("LFatSt", JSON.stringify({ AccessToken: tokenInfo.AccessToken, ValidTo } as TokenInfoStorage));
            this.LoadUser();
            this._isAuthenticated = true;
            return true;
        } catch (e) {
            console.log(e);

            this.RevokeCredentials();

            throw "Houve um erro ao tentar realizar essa ação. Você será redirecionado para o LogIn";
        }
    }
}

export default AuthenticationService;