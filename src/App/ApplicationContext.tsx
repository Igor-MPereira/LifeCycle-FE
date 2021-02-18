import { UserInfo } from "os";
import { createContext, ComponentType } from "react";

export interface IApplicationContext {
    Version: string;
    // Auth: AuthenticationService;
    // User: UserInfo;

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