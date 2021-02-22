import { RouteProps } from "react-router-dom";

export type RouteCondition = boolean | (() => boolean);

export interface IConditionalRoutesProps extends ICustomRouteProps {
    condition: RouteCondition;
    returnUrl: string;
}

export interface IAuthenticatedRouteProps extends ICustomRouteProps {
    authenticated?: RouteCondition;
    returnUrl?: string;
}

export interface IUserProfileRouteProps extends ICustomRouteProps {
    profileOwnerRoute: boolean;
}

export interface ICustomRouteProps extends RouteProps {
    title?: string;
}