import { Guid } from "@/Common/BaseTypes";

export interface LoginCredentials {
    Email: string;
    Login: string;
    Password: string;
}

export interface UserCredentials {
    Id: Guid;
    UserLogin: string;
    Email: string;
    DisplayName: string;
    Explicit: boolean;
    City?: string;
    State?: string;
    Country?: string;
    PhoneNumber?: string;
    Description?: string;
    ProfilePictureId?: Guid;
    BackgroundPictureId?: Guid;
    BirthDate?: Date;
    RegisterDate?: Date;
}