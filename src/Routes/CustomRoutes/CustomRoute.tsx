import React from 'react';
import { Route } from 'react-router-dom';
import { ICustomRouteProps } from './types';

function CustomRoute({ title, ...rest }: ICustomRouteProps) {
    document.title = `LifeCycle${title ? ` - ${title}` : ''}`;

    return <Route {...rest} />
}

export default CustomRoute;