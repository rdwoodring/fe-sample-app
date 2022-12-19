type UnwrapArray<T> = T extends Array<any> ?
    T[number] :
    never;

export type {
    UnwrapArray
};