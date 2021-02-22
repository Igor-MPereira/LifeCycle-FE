import { Guid } from "@/Common/BaseTypes";

export type UserInfoInit =
    [id: string, displayName: string, login: string, email: string, birthDate: string, location: string]
  | [ undefined? ];  

export default class UserInfo {
    public Id: Guid = new Guid();
    public DisplayName: string = "";
    public Login: string = "";
    public Email: string = "";
    public BirthDate: Date = new Date();
    public City: string = "";
    public State: string = "";
    public Country: string = "";

    constructor(...init: UserInfoInit) {
        const [ id, displayName, login, email, birthDate, location ] = init;

        if(id && displayName && birthDate && email && login && location) {
            this.Id = new Guid(id);
            this.BirthDate = new Date(birthDate);
            this.DisplayName = displayName;
            this.Email = email;
            this.Login = login;
            const locationObj = Object.fromEntries(location.split(',').map(l => { const L = l.split(":"); return [ L[0], L[1] ] }));
            this.City = locationObj["City"] ?? '';
            this.Country = locationObj["Country"] ?? '';
            this.State = locationObj["State"] ?? '';
        }
    }
}