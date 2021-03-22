import { UserInfo } from "@/Models/User";
import AuthenticationService from "@/Services/Authentication/AuthenticationService";
import { Theme } from "@material-ui/core";
import { createContext, ComponentType, useContext } from "react";
import * as H from 'history';
import { BaseLocationState } from "@/Common/BaseTypes";

export type PageInfo = Partial<H.Location<BaseLocationState>>

export interface IApplicationContext {
    Version: string;
    language: string;
    Auth: AuthenticationService;
    theme: Theme;
    User: UserInfo;
    UpdateUser: (User: UserInfo) => Promise<void>;
    // Page: PageInfo;
    // UpdatePage: (Page: PageInfo) => void;
}

export interface IApplicationContextProp {
    appContext: IApplicationContext;
}

const ctx = createContext<IApplicationContext | null>(null);

export const ApplicationContextProvider = ctx.Provider;

export const ApplicationContextConsumer = ctx.Consumer;


export function withAppContext<C extends IApplicationContextProp>(OriginalComponent: ComponentType<C>) {
    return function ContextBoundComponent(props: Omit<C, keyof IApplicationContextProp>) {
        return (
            <ApplicationContextConsumer>
                {ctx => <OriginalComponent {...props as C} appContext={ctx} />}
            </ApplicationContextConsumer>
        );
    }
};

export function useAppContext() {
    return useContext(ctx)
}