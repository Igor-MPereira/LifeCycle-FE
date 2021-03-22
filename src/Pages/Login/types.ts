import { IBasePageProps } from "@/Common/BaseTypes";

export interface ILoginProps<C extends string = string> extends IBasePageProps<{}, C> { }

export interface ILoginState {
    Input: string;
    Password: string;
    SignInFailedError: string;
    InputValidationMessage: string;
    PasswordValidationMessage: string;
    PasswordValidationScore: number;
    ShowPassword: boolean;
    RememberMe: boolean;
}