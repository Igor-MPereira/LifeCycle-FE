import { RoutingUtil } from "@/Utils";
import { PureComponent } from "react";
import { Redirect, Route } from "react-router-dom";
import ConditionalRoute from "./ConditionalRoute";
import { IAuthenticatedRouteProps } from "./types";

class AuthenticatedRoute extends PureComponent<IAuthenticatedRouteProps> {
    // private AuthService: AuthenticationService.Instance;

    constructor(props: IAuthenticatedRouteProps) {
        super(props);
    }

    render() {
        const { authenticated, returnUrl, title, ...rest } = this.props;
        let c = false;

        if(typeof authenticated === "boolean") {
            c = authenticated;
        } else if(typeof authenticated === "function") {
            c = authenticated();
        }

        c //&&= AuthenticationService.Instance.IsAuthenticated;

        return <ConditionalRoute {...rest} title={title} condition={c} returnUrl={returnUrl ?? '/Login'} />
    }
}