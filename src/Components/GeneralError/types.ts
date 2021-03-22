import { IApplicationContextProp } from "@/App/ApplicationContext";
import { ErrorInfo } from "react";

export interface IGeneralErrorProps extends IApplicationContextProp { }

export interface IGeneralErrorState { 
    error: Error | null;
    errorDetails: ErrorInfo | null;
}