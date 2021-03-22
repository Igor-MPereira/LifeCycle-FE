export default abstract class ClassNames {
    public static useClassNames(...params: (string | undefined)[]) {
        return params.Where(p => p !== undefined).join(' ');
    }
}