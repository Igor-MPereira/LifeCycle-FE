import { ApiResponse, ErrorResponse } from ".";

export type BaseResponseInit = 
    [ message: string, success: boolean, statusCode: number ] 
  | [ ];

export default class _BaseResponse {
    public Message;

    public Success;

    public StatusCode;

    constructor(...rest: BaseResponseInit) {
        const [ something, anything, statusCode ] = rest;

        this.Message = something ?? '';
        this.Success = anything ?? true;
        this.StatusCode = statusCode ?? 200;
    }
};

export function isApiResponse<TResponse>(x: unknown): x is ApiResponse<TResponse> {
    let val = x as ApiResponse<TResponse>;

    return val !== undefined && val !== null
        && val.Value !== undefined;
}

export function isErrorResponse(x: unknown): x is ErrorResponse {
    let val = x as ErrorResponse;

    return val !== undefined && val !== null
        && val.Success !== true && val.StatusCode !== 200; 
}