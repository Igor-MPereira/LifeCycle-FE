import { Guid } from "@/Common/BaseTypes";

export class UserInfo {
    public Id: Guid = new Guid();

    public UserLogin: string = "";

    public Email: string = "";

    public DisplayName: string = "";

    public Explicit: boolean = true;

    public City?: string;

    public State?: string;

    public Country?: string;

    public PhoneNumber?: string;

    public Description?: string;

    public ProfilePictureId?: Guid;

    public BackgroundPictureId?: Guid;

    public BirthDate?: Date;

    public RegisterDate?: Date;

    public get Location() { return `${this.Country}, ${this.State}, ${this.City}` }

    public get DisplayPhoneNumber() { return '' }

    constructor(user?: UserInfo) {
        if(user) {
            this.Id = user.Id;
            this.UserLogin = user.UserLogin;
            this.Email = user.Email;
            this.DisplayName = user.DisplayName;
            this.Explicit = user.Explicit;
            this.City = user.City;
            this.State = user.State;
            this.Country = user.Country;
            this.PhoneNumber = user.PhoneNumber;
            this.Description = user.Description;
            this.ProfilePictureId = user.ProfilePictureId;
            this.BackgroundPictureId = user.BackgroundPictureId;
        }
    }
}