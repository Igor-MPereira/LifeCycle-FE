import { BaseLocationState, IBaseComponentProps } from "@/Common/BaseTypes";
import Feed from "@/Pages/Feed";
import Login from "@/Pages/Login";
import Register from "@/Pages/Register";
import { BaseRouteChildrenProps } from "@/Utils/Routing/RoutingUtil";
import { Typography } from "@material-ui/core";
import React, { ComponentType } from "react";
import { Redirect, Route, RouteChildrenProps, Switch } from "react-router-dom";
import CustomRoute from "./CustomRoutes/CustomRoute";

const Routes = () => {
    return (
        <Switch>
            <Redirect exact from='/' to='/Feed' />
            <CustomRoute
                exact
                path={[`/Feed`]}
                title='Publicações'
            >
                {(props: BaseRouteChildrenProps) => <Feed {...props} />}
            </CustomRoute>
            <CustomRoute
                exact
                path={[`/Login`,'/Signin',`/Entrar`]}
                title='Entrar'
            >
                {(props: BaseRouteChildrenProps) => <Login {...props} />}
            </CustomRoute>
            <CustomRoute 
                exact
                path={[`/Register`,`/Registrar`,`/Signup`]}
                title='Registrar'
            >
                {(props: BaseRouteChildrenProps) => <Register {...props} />}
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