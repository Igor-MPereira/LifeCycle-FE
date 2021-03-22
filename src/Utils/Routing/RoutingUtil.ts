import { BaseLocationState } from '@/Common/BaseTypes';
import { RouteChildrenProps, RouteProps } from 'react-router-dom';

export type BaseRouteChildrenProps = RouteChildrenProps<{}, BaseLocationState>;

export default class RoutingUtil {
    static getPathnameFromLocation(location?: Partial<RouteProps["location"]>) {

        if(location === undefined || location.pathname === undefined) {
            return '';
        } else {
            return location.pathname;
        }
    }
}