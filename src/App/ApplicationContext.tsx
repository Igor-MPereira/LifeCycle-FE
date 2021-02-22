import { UserInfo } from "@/Models/User";
import AuthenticationService from "@/Services/Authentication/AuthenticationService";
import { Theme } from "@material-ui/core";
import { createContext, ComponentType } from "react";

export interface IApplicationContext {
    Version: string;
    language: string;
    Auth: AuthenticationService;
    User: UserInfo;
    theme: Theme;
    UpdateUser: (User: UserInfo) => Promise<void>;
}

export interface IApplicationContextProp {
    appContext: IApplicationContext;
}

const ctx = createContext<IApplicationContext | null>(null);

export const ApplicationContextProvider = ctx.Provider;

export const ApplicationContextConsumer = ctx.Consumer;


export function withAppContext<C extends IApplicationContextProp>(OriginalComponent: ComponentType<C>) {
    return function ContextBoundComponent(props: Pick<C, Exclude<keyof C, keyof IApplicationContextProp>>) {
        return (
            <ApplicationContextConsumer>
                {ctx => <OriginalComponent {...props as C} appContext={ctx} />}
            </ApplicationContextConsumer>
        );
    }
};