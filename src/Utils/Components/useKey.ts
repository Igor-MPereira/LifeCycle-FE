export type KeyParameter = string | number | undefined;

export function useRandomKey(...keys: KeyParameter[]) {
    const randomKey = Math.round(Math.random() * 1000);
    return useKey(...keys, randomKey);
}

export function useKey(...keys: KeyParameter[]) {
    return [...keys].Where(k => k !== undefined).join('-');
}