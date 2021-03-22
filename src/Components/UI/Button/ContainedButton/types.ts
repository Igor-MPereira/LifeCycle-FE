import { ButtonBaseProps } from "@material-ui/core/ButtonBase";

export type ContainedButtonStyleTypeMap = {
    buttonColor?: string;
    hoverColor?: string;
    width?: string | number;
    shadow?: string;
};

export type ContainedButtonTypeMap = { };

export interface IContainedButtonProps extends ButtonBaseProps<'button', ContainedButtonStyleTypeMap & ContainedButtonTypeMap> { }