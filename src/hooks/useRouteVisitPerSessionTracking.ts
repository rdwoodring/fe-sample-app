import { useEffect } from 'react';
import {
    useLocation
} from 'react-router-dom';

import {
    useAppDispatch
} from './useAppDispatch';

import {
    visitRoute
} from '../redux/reducers/visitedRoutes';

function useRouteVisitePerSessionTracking() {
    const {
        pathname
    } = useLocation(),
    dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(visitRoute(pathname));
    }, [
        dispatch,
        pathname
    ]);
}

export default useRouteVisitePerSessionTracking;