import { IApplicationContext } from "./ApplicationContext";

export interface ApplicationProps {
    AppVersion: string;
}

export interface ApplicationState {
    appContext: IApplicationContext;
}