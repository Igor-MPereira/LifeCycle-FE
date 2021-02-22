export default interface TokenInfo {
    AccessToken: string;
    ValidTo: Date;
}

export interface TokenInfoDTO {
    AccessToken: string;
    ValidTo: string;
}

export interface TokenInfoStorage {
    AccessToken: string;
    ValidTo: number;
}