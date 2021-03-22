import { PageInfo, useAppContext } from '@/App/ApplicationContext';
import React, { useEffect } from 'react';
import { Route } from 'react-router-dom';
import { ICustomRouteProps } from './types';
import { Location } from 'history';

function CustomRoute({ title, ...rest }: ICustomRouteProps) {
    document.title = `LifeCycle${title ? ` - ${title}` : ''}`;

    return <Route {...rest} />
}

export default CustomRoute;