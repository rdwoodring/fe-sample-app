import { useEffect, useState } from "react";

function useLoadUntilDataExists<T extends Record<string, unknown> | unknown[]>(data: T): boolean {
    const [
        loading,
        setLoading
    ] = useState(true);
    
    useEffect(() => {
        if (Array.isArray(data) && data.length) {
            setLoading(false);
        } else if (!Array.isArray(data) && Object.keys(data).length) {
            setLoading(false);
        }
    }, [
        data
    ]);

    return loading;
}

export default useLoadUntilDataExists;