function normalize<T extends Record<string, unknown>>(idKey: keyof T, recordsToNormalize: T[]): Record<string, T> {
    return recordsToNormalize.reduce((acc, record) => {
        return {
            ...acc,
            [String(record[idKey])]: record
        }
    }, {} as Record<typeof idKey, T>);
}

export default normalize;