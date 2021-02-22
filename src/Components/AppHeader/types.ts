import { IBaseComponentProps } from "@/Common/BaseTypes";
import { UserInfo } from "@/Models/User";

export interface IAppHeaderProps<C extends string = string> extends IBaseComponentProps<C> {
    isLoggedIn: boolean;
    UserInfo: UserInfo;
    
}

export interface IAppHeaderState {

}