import { Action, Reducer, PayloadAction } from "@reduxjs/toolkit";

const VISITED_ROUTE = 'VISITED_ROUTE' as const;

type Payload = string;
type State = Record<Payload, number>;
type VisitedRoutesReducer = Reducer<State, PayloadAction<Payload, typeof VISITED_ROUTE>>;

const initialValue = {},
    visitRoute = (route: Payload) => {
        return {
            type: VISITED_ROUTE,
            payload: route
        };
    },
    visitedRoutesReducer: VisitedRoutesReducer = (state = initialValue, action) => {
        switch(action.type) {
            case VISITED_ROUTE:
                const visitedRoute = action.payload;

                let mergedState = {...state};

                if (state[visitedRoute]) {
                    mergedState = {
                        ...mergedState,
                        [visitedRoute]: state[visitedRoute] + 1
                    };
                } else {
                    mergedState = {
                        ...mergedState,
                        [visitedRoute]: 1
                    };
                }

                return mergedState;
            default:
                return state;
        }
    }

export default visitedRoutesReducer;

export {
    visitRoute
};