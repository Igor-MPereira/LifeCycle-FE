import { BaseTextFieldProps } from "@material-ui/core";

export interface ICredentialsInputProps extends BaseTextFieldProps {
    onChange(value: string): void;
}