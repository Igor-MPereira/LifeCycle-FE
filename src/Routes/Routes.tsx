import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import CustomRoute from "./CustomRoutes/CustomRoute";

const Routes = () => {

    return (
        <Switch>
            <Route
                exact
                path='/'
            >
                <Redirect to='/Feed' />
            </Route>
            <Route
                exact
                path={[`/Feed`]}
            />
            <Route
                exact
                path={[`/Login`,'/Signin',`/Entrar`]}
            />
            <Route 
                exact
                path={[`/Register`,`/Registrar`,`/Signup`]}
            />
            <Route
                exact
                sensitive
                path={[`/User/:userLogin`,`/Usuario/:userLogin`]}
            />
            <CustomRoute
                path=''
                title='LifeCycle - Página Não Encontrada'
            />
        </Switch>
    );
}

export default Routes;