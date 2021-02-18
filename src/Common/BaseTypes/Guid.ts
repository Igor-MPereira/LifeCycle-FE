import { basename } from "path";

export class Guid extends String {
    private static regex: RegExp = new RegExp(/^(\{{0,1}([0-9a-fA-F]){8}-{0,1}([0-9a-fA-F]){4}-{0,1}([0-9a-fA-F]){4}-{0,1}([0-9a-fA-F]){4}-{0,1}([0-9a-fA-F]){12}\}{0,1})$/i);

    constructor(x?: unknown) {
        let _init = Guid.EmptyGuidString;

        if(Guid.IsGuid(x)) {
            _init = String(x).toLowerCase()
                .replace(/\[\{\-\}\]/, '')
                .replace(/^(\w{8})(\w{4})(\w{4})(\w{4})(\w{12})$/, '$1-$2-$3-$4-$5')
        }

        super(_init);
    }

    public static EmptyGuid: Guid = new Guid();
    public static EmptyGuidString: string = '00000000-0000-0000-0000-000000000000';
    public static IsGuid(x: unknown): x is Guid {
        const val = x as Guid;

        return val !== undefined 
            && val !== null
            && typeof val.valueOf() === 'string'
            && Guid.regex.test(val.valueOf());
    }

    public get IsEmpty() {
        return this.valueOf() === Guid.EmptyGuidString;
    }

    public Equals(guid: Guid) {
        return this.valueOf() === guid.valueOf();
    }
}