import { StyledComponentProps } from "@material-ui/styles";
import { IApplicationContext } from "./ApplicationContext";

export interface ApplicationProps<Classkey extends string = string> extends StyledComponentProps<Classkey> {
    AppVersion: string;
    language: string;
}

export interface ApplicationState {
    appContext: IApplicationContext;
}