import { RoutingUtil } from "@/Utils";
import { PureComponent } from "react";
import { Redirect, Route } from "react-router-dom";
import { IConditionalRoutesProps } from "./types";

class ConditionalRoute extends PureComponent<IConditionalRoutesProps> {
    // private AuthService: AuthenticationService.Instance;

    constructor(props: IConditionalRoutesProps) {
        super(props);
        document.title = props.title ?? document.title;
    }

    render() {
        const { condition, returnUrl, title, ...rest } = this.props;
        let c = false;
        if(typeof condition === "boolean") {
            c = condition;
        } else if(typeof condition === "function") {
            c = condition();
        }

        if(!c) return <Redirect from={RoutingUtil.getPathnameFromLocation(rest.location)} to={returnUrl} />;

        return (
            <Route
                {...rest}
            />
        );
    }
}

export default ConditionalRoute;