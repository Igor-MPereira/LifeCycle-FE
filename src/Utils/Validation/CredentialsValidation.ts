import StringValidation from "./StringValidation";

export default class CredentialsValidation {
    public static ValidatePassword(password: string): number {
        let score = 0;
        if(StringValidation.NotEmpty(password)) {
            score+=5;
            if(password.length > 4) {
                score+=10;

                if(password.match(/[a-z]/g)) {

                }

                if(password.match(/\w*[A-Z]/g)) {

                }

                if(password.match(/[0-9]/g)) {

                }

                if(password.match(/[!@#$%^&*(),.?":{}|<>]/g))

                return score;
            }

            return score;
        }

        return score;
    }
}