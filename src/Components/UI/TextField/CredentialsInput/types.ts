import { BaseTextFieldProps } from "@material-ui/core";
import React from "react";

export interface ICredentialsInputProps extends BaseTextFieldProps {
    onChange(value: string): void;
    endAdornment?: React.ReactNode;
}