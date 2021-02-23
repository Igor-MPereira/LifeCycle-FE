export default class StringValidation {
    public static NotEmpty(...inputs: string[]) {
        return inputs.every((v, i, a) => v.trim() !== '')
    }
}