import { useEffect } from 'react';
import useInitializing from './useInitializing';

function useOnMount(callbackToBeExectuedOnMount: (...args: any[]) => void) {
    const initializing = useInitializing();

    useEffect(() => {
        if (initializing) {
            callbackToBeExectuedOnMount();
        }
    }, [
        callbackToBeExectuedOnMount,
        initializing
    ]);
}

export default useOnMount;