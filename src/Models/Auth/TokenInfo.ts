export default interface TokenInfo {
    AccessToken: string;
    RefreshToken: string;
    ValidTo: Date;
}

export interface TokenInfoDTO {
    AccessToken: string;
    RefreshToken: string;
    ValidTo: string;
}

export interface TokenInfoStorage {
    AccessToken: string;
    ValidTo: number;
}