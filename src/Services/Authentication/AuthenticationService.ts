import 'linq4js';
import jwt_decode, { JwtPayload } from 'jwt-decode';
import RequestService from '../Request/RequestService';


class AuthenticationService {
    private static _singletonInstance: AuthenticationService | null = null;
    private _userInfo: UserInfo;
    private _authToken: string = "";
    private _expiresIn: number = 0;

    constructor() {
        AuthenticationService._singletonInstance = this;
        this.ReqService = new RequestService();
    }

    public static readonly AuthEndpoint: string = RequestService.apiUrl + 'auth';
    private ReqService: RequestService;
}

export default AuthenticationService;