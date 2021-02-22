export type KeyType<key> = key & string;

export type ValueType<value> = value & {};

export type KeyValueInit<key, value> =
    [key: KeyType<key>, value: ValueType<value>];
  

export default class KeyValue<key = KeyType<string>, value = ValueType<{}>> {
    public Key;
    public Value;

    constructor(...init: KeyValueInit<key, value>) {
        const [ key, value ] = init;

        this.Key = key;
        this.Value = value;
    }
}

new KeyValue("dada", { a: "sda"} );
