import _BaseResponse from "./_BaseResponse";

export type ApiResponseInit<TResponse> = 
    [ value: TResponse, message: string, success: boolean, statusCode: number ]
  | [ value: TResponse, message: string ]; 

export default class ApiResponse<TResponse> extends _BaseResponse {
    public Value;

    constructor(...init: ApiResponseInit<TResponse>) {
        const [ value, message, success, statusCode ] = init;

        super(message, success ?? true, statusCode ?? 200);

        this.Value = value;
    }
}