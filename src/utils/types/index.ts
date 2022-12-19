type UnwrapArray<T> = T extends Array<any> ?
    T[number] :
    never;

type UnwrapRecord<T> = T extends Record<string, unknown> ?
    T[string] :
    never;

export type {
    UnwrapArray,
    UnwrapRecord
};