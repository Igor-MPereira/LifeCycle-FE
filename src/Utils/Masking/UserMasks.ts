export default class UserMasks {
    public static MaskPhoneNumber(phoneNumber: string) {
        return phoneNumber
            .replace(/^(\+[0-9]{2})([0-9]{2,3})([0-9]{9})$/i, '$1 ($2) $3');
    }

    public static HideFullEmail(email: string) {
        return email
            .replace(/^([a-zA-Z0-9._%-]{3})([a-zA-Z0-9._%-]*)@([a-zA-Z0-9.-]+)([a-zA-Z0-9.-]{3})\.([a-zA-z]{2,4})$/i, '$1*******@******$4.$5');
    }
}