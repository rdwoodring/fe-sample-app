import { useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { useAppSelector } from './useAppSelector';
import useOnMount from './useOnMount';

function useOnInitialRouteMount(callbackToBeExectuedOnMount: Parameters<typeof useOnMount>[0]) {
    const location = useLocation(),
        visitedLocations = useAppSelector(state => state.visitedRoutes),
        wrappedCallback = useCallback(() => {
            const {
                    pathname
                } = location,
                isPathInVisitedLocationsHashmap = visitedLocations[pathname],
                isVisitCountZero = visitedLocations[pathname] === 0,
                hasBeenVisited = isPathInVisitedLocationsHashmap && !isVisitCountZero;

            if (!hasBeenVisited) {
                callbackToBeExectuedOnMount();
            }
        }, [
            callbackToBeExectuedOnMount,
            location,
            visitedLocations
        ]);

    useOnMount(wrappedCallback);
}

export default useOnInitialRouteMount;