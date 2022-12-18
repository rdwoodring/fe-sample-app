import { useCallback } from "react";
import { useLocation } from "react-router-dom";
import { useAppSelector } from "./useAppSelector";
import useOnMount from "./useOnMount";

function useOnRouteMount(callbackToBeExectuedOnMount: Parameters<typeof useOnMount>[0]) {
    const location = useLocation(),
        visitedLocations = useAppSelector(state => state.visitedRoutes),
        wrappedCallback = useCallback(() => {
            const {
                pathname
            } = location;

            if (!visitedLocations[pathname] || visitedLocations[pathname] === 0) {
                callbackToBeExectuedOnMount();
            }
        }, [
            callbackToBeExectuedOnMount,
            location,
            visitedLocations
        ]);

    useOnMount(wrappedCallback);
}

export default useOnRouteMount;