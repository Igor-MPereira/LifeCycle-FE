import { RouteProps } from 'react-router-dom';

export default class RoutingUtil {
    static getPathnameFromLocation(location: RouteProps["location"]) {
        let caller = this.caller ?? "null";

        if(location === undefined) {
            throw Error(`ArgumentNullException: location is undefined, thrown at ${RoutingUtil.getPathnameFromLocation.name}, ${caller}`);
        } else {
            return location.pathname;
        }
    }
}