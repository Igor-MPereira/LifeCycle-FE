import { IBasePageProps } from "@/Common/BaseTypes";
import { IFormPaperProps } from "@/Components/UI/Paper/FormPaper";
import { ICredentialsInputProps } from "@/Components/UI/TextField/CredentialsInput";
import { GridTypeMap } from "@material-ui/core";
import { DefaultComponentProps } from "@material-ui/core/OverridableComponent";

export interface IRegisterProps<C extends string = string> extends IBasePageProps<{}, C> {

}

export interface IRegisterState {
    Email: string;
    Login: string;
    DisplayName: string;
    Password: string;
    VerifyPassword: string;
    BirthDate: Date | null;
    City: string;
    State: string;
    Country: string;
    PhoneNumber: string;
    Explicit: boolean;
    index: number;
}

export type CredentialsInputProps = ICredentialsInputProps[];

export type DatePickerProps = { id?: string }[];

export type FormPaperChildrenProps = (TypedFormPaperChildrenProps<ICredentialsInputProps> | TypedFormPaperChildrenProps<{ id?: string}>)[];

export type TypedFormPaperChildrenProps<Props> = {  
    childrenType: 'CredentialsInputProps' 
                | 'DatePickerProps';    
    childrenProps: Props; 
}

export type FormPaperProps = (Omit<IFormPaperProps, "children"> & { childrenProps?: FormPaperChildrenProps })[];

export type RegisterFormsProps = (Omit<DefaultComponentProps<GridTypeMap>, "children"> & { childrenProps?: FormPaperProps })[];