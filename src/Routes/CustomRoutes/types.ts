import { RouteProps } from "react-router-dom";

export type RouteCondition = boolean | (() => boolean);

export interface IConditionalRoutesProps extends RouteProps {
    condition: RouteCondition;
    returnUrl: string;
}

export interface IAuthenticatedRouteProps extends RouteProps {
    authenticated?: RouteCondition;
    returnUrl?: string;
}

export interface IUserProfileRouteProps extends RouteProps {
    profileOwnerRoute: boolean;
}