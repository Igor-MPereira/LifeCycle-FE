import { Route, Switch } from "react-router-dom";

function Routes() {

    return (
        <Switch>
            <Route
                exact
                path={[`/Feed`]}
            >

            </Route>
            <Route
                exact
                path={[`/Login`,'/Signin',`/Entrar`]}
            >

            </Route>
            <Route 
                exact
                path={[`/Register`,`/Registrar`,`/Signup`]}
            >

            </Route>
            <Route
                exact
                sensitive
                path={[`/User/:userLogin`,`/Usuario/:userLogin`]}
            >

            </Route>
        </Switch>
    );
}

export default Routes;