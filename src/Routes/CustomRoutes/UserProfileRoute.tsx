import RoutingUtil from "@/Utils/Routing/RoutingUtil";
import { PureComponent } from "react";
import { Redirect, Route } from "react-router-dom";
import ConditionalRoute from "./ConditionalRoute";
import { IUserProfileRouteProps } from "./types";

class UserProfileRoute extends PureComponent<IUserProfileRouteProps> {
    // private AuthService: AuthenticationService.Instance;

    constructor(props: IUserProfileRouteProps) {
        super(props);
    }

    render() {
        const { profileOwnerRoute, ...rest } = this.props;
        let c = false;


        c //&&= AuthenticationService.Instance.IsAuthenticated;

        return <ConditionalRoute {...rest} condition={c} returnUrl={'/Login'} />
    }
}