import { IBasePageProps, IBaseThemedPageProps } from "@/Common/BaseTypes";

export interface IFeedProps<C extends string = string> extends IBasePageProps<{}, C> { }

export interface IFeedState {
    Tags: string[];
}