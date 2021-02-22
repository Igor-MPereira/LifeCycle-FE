import { IApplicationContextProp } from "@/App/ApplicationContext";
import { StyledComponentProps } from "@material-ui/styles";
import { RouteChildrenProps, RouteComponentProps } from "react-router-dom";
import * as H from 'history';
import KeyValue from "./KeyValue";

export interface IBaseComponentProps<C extends string = string> extends StyledComponentProps<C> { }

export interface IBasePageProps<Params extends { [K in keyof Params]?: string } = { }, C extends string = string, A = { }, S = any> 
    extends IBaseComponentProps<C>, 
            RouteChildrenProps<Params, BaseLocationProps<A, S>>, 
            IApplicationContextProp { }

export type BaseLocationProps<A = {} , S = any> = (IBaseLocationState<S> & A) | undefined;

export interface IBaseLocationState<S = any> {
    from?: H.LocationDescriptor<S>;
    args?: Array<KeyValue>;
    returnUrl?: string;
}