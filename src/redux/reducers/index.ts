import {
    combineReducers
} from 'redux';

import visitedRoutesReducer from './visitedRoutes';

export default combineReducers({
    visitedRoutes: visitedRoutesReducer
});