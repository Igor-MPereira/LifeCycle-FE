import { TypographyProps } from "@material-ui/core/Typography";
import React from "react";

export interface IFormPaperProps {
    title: string;
    className?: string;
    onClick?(): void;
    TypographyProps?: Partial<TypographyProps>;
    children?: React.ReactNode;
}