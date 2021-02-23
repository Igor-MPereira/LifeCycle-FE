import { BaseLocationState, IBaseComponentProps } from "@/Common/BaseTypes";
import Login from "@/Pages/Login";
import { Typography } from "@material-ui/core";
import React, { ComponentType } from "react";
import { Redirect, Route, RouteChildrenProps, Switch } from "react-router-dom";
import CustomRoute from "./CustomRoutes/CustomRoute";

const Routes = () => {
    return (
        <Switch>
            <CustomRoute
                exact
                path='/'
            >
                <Redirect to='/Feed' />
            </CustomRoute>
            <CustomRoute
                exact
                path={[`/Feed`]}
            >
                <Typography>Login feito com sucesso!</Typography>
            </CustomRoute>
            <CustomRoute
                exact
                path={[`/Login`,'/Signin',`/Entrar`]}
                title='Login'
            >
                {(props: RouteChildrenProps<{}, BaseLocationState>) => <Login {...props} />}
            </CustomRoute>
            <CustomRoute 
                exact
                path={[`/Register`,`/Registrar`,`/Signup`]}
            >

            </CustomRoute>
            <CustomRoute
                exact
                sensitive
                path={[`/User/:userLogin`,`/Usuario/:userLogin`]}
            >

            </CustomRoute>
            <CustomRoute
                path=''
                title='LifeCycle - Página Não Encontrada'
            >
                
            </CustomRoute>
        </Switch>
    );
}

export default Routes;