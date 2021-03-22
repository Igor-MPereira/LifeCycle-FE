import { PageInfo } from "@/App/ApplicationContext";
import { IBaseComponentProps, IBaseThemedComponentProps } from "@/Common/BaseTypes";
import { UserInfo } from "@/Models/User";

export interface IAppHeaderProps<C extends string = string> extends IBaseThemedComponentProps<C> {
    isLoggedIn: boolean;
    UserInfo: UserInfo;    
}

export interface IAppHeaderState {

}