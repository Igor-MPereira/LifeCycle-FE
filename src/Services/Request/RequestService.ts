import AuthenticationService from "../Authentication/AuthenticationService";

class RequestService {
    private static readonly _serverUrl: string = `https://localhost:5001/`;
    private AuthService: AuthenticationService;
    private headers: Headers; 
    
    constructor() {
        this.AuthService = AuthenticationService.Instance;
        this.headers = new Headers();
    }

    public static readonly apiUrl: string = RequestService._serverUrl + 'api';
    
    appendHeader(prop: string, value: string): void {
		this.headers.has(prop)
			? this.headers.set(prop, value)
			: this.headers.append(prop, value);
	}

	removeHeader(prop: string) {
		if (this.headers.has(prop)) {
			this.headers.delete(prop);
		}
	}
}

export default RequestService;