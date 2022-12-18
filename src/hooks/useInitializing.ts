import {
    useState,
    useEffect
} from 'react';

function useInitializing() {
    const [
        initializing,
        setInitializing
    ] = useState(true);

    useEffect(() => {
        setInitializing(false);
    }, []);

    return initializing;
}

export default useInitializing;