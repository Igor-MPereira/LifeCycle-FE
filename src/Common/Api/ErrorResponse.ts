import _BaseResponse from "./_BaseResponse";

export type ErrorResponseInit = 
    [ message: string, statusCode: number, details: string]
  | [ message: string, statusCode: number ]
  | [ message: string];

export default class ErrorResponse extends _BaseResponse {
    private static readonly _BaseErrorMessage = "Um erro inesperado ocorreu e não foi possível completar essa tarefa";
    public Details;

    constructor(...init: ErrorResponseInit) {
        const [ message, statusCode, details ] = init;

        super(message ?? ErrorResponse._BaseErrorMessage, false, statusCode ?? 500);

        this.Details = details ?? '';
    }

    public toString() { return `${this.Message}:${this.Details}:${this.StatusCode}`; }
}