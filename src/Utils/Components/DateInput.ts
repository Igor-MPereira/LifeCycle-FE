export default abstract class DateInput {
    public static LocaleStringToInput(dateString: string) {
        if(dateString === '') return '';

        if(dateString.match(/\d{2}\/\d{2}\/\d{4}/g)) {
            return dateString.replaceAll(/(\d{2})\/(\d{2})\/(\d{4})/g, '$3-$2-$1');
        } else {    
            return dateString.replaceAll('/', '-');
        }
    }

    public static InputStringToLocale(inputString: string) {

    }
}