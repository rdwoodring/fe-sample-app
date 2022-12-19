import {
    combineReducers
} from 'redux';

import policyHoldersReducer from './policyHolders';

import visitedRoutesReducer from './visitedRoutes';

export default combineReducers({
    visitedRoutes: visitedRoutesReducer,
    policyHolders: policyHoldersReducer
});