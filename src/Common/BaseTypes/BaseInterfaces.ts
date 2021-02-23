import { IApplicationContextProp } from "@/App/ApplicationContext";
import { StyledComponentProps } from "@material-ui/styles";
import { RouteChildrenProps, RouteComponentProps } from "react-router-dom";
import * as H from 'history';
import KeyValue from "./KeyValue";
import { ThemedComponentProps } from "@material-ui/core/styles/withTheme";

export interface IBaseComponentProps<C extends string = string> extends StyledComponentProps<C> { }

export interface IBaseThemedComponentProps<C extends string = string> extends IBaseComponentProps<C>, ThemedComponentProps { }

export interface IBasePageProps<Params extends { [K in keyof Params]?: string } = { }, C extends string = string, A = { }, S = any> 
    extends IBaseComponentProps<C>, 
            RouteChildrenProps<Params, BaseLocationState<A, S>>, 
            IApplicationContextProp { }

export interface IBaseThemedPageProps<Params extends { [K in keyof Params]?: string } = { }, C extends string = string, A = { }, S = any>
    extends IBasePageProps<Params, C, A, S>, ThemedComponentProps { }

export type BaseLocationState<A = {} , S = any> = (IBaseLocationState<S> & A) | undefined;

export interface IBaseLocationState<S = any> {
    from?: H.LocationDescriptor<S>;
    args?: Array<KeyValue>;
    returnUrl?: string;
}