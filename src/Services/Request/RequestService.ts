import { ApiResponse, ErrorResponse, isApiResponse, isErrorResponse, _BaseResponse } from "@/Common/Api";
import AuthenticationService from "../Authentication/AuthenticationService";
import { ERequestServiceConfig } from "./types";

class RequestService {
    private static readonly _serverUrl: string = `https://localhost:5001/`;
    private AuthService: AuthenticationService;
    private headers: Headers; 

    private ConfigureServiceDefaults(config?: ERequestServiceConfig) {
        if(config === undefined || config === ERequestServiceConfig.JsonDefault) {
            this.headers.append("Authorization", `Bearer ${this.AuthService.Token}`)
            this.headers.append("Content-Type", "application/json");
            this.headers.append("Accept", "application/json");
        } else if(config === ERequestServiceConfig.AnonymousJsonDefault) {
            this.headers.append("Content-Type", "application/json");
            this.headers.append("Accept", "application/json");
        } else if(config === ERequestServiceConfig.FormDataDefault) {
            // for some reason setting content type multipart formdata causes an error to API
            this.headers.append("Accept", "application/json");
        }
    }

    private ValidateResult<TResponse>(result: _BaseResponse): TResponse {
        if(isApiResponse<TResponse>(result)) {
            return result.Value;
        } else if(isErrorResponse(result)) {
            if(result.StatusCode === 404) {
                throw new ErrorResponse("Nenhum Resultado Foi Encontrado", 404, result.Details);
            } else if(result.StatusCode === 500) {
                throw new ErrorResponse(result.Message, 500, result.Details);
            } else if(result.StatusCode === 400) { 
                throw new ErrorResponse(result.Message + ' verifique novamente os dados enviados.', 400, result.Details);
            } else {
                throw new ErrorResponse(result.Message, 500, result.Details);
            }
        }

        throw new ErrorResponse("Algo inesperado deu errado", 0);
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
    
    constructor(config?: ERequestServiceConfig) {
        this.AuthService = AuthenticationService.Instance;
        this.headers = new Headers();
        this.ConfigureServiceDefaults(config);
    }

    public static readonly apiUrl: string = RequestService._serverUrl + 'api/';
    
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

    public GetJson = async <Response = unknown>(url: string): Promise<Response> => {
        try {
            if(this.headers.has("Authorization") && !this.AuthService.IsAuthenticated) {
                await this.AuthService.Refresh();
                this.appendHeader("Authorization", `Bearer ${this.AuthService.Token}`);
            }

            let response = await fetch(
                RequestService.apiUrl + url,
                {
                    method: 'GET',
                    headers: this.headers,
                    mode: 'cors'
                }
            );

            let result = await response.json() as _BaseResponse;
            return this.ValidateResult(result);
        } catch (e) {
            console.log(e);
            
            throw this.ThrowErrorResponse(e);
        }
    }

    public PostJson = async <Request, Response = unknown>(url: string, data: Request): Promise<Response> => {
        try {
            if(this.headers.has("Authorization") && !this.AuthService.IsAuthenticated) {
                console.log('refresh')
                await this.AuthService.Refresh();
                this.appendHeader("Authorization", `Bearer ${this.AuthService.Token}`);
            }

            let response = await fetch(
                RequestService.apiUrl + url,
                {
                    method: 'POST',
                    headers: this.headers,
                    mode: 'cors',
                    body: JSON.stringify(data)
                }
            );

            let result = await response.json() as _BaseResponse;

            return this.ValidateResult(result);
        } catch (e) {
            console.log(e);

            throw this.ThrowErrorResponse(e);
        }
    }
}

export default RequestService;