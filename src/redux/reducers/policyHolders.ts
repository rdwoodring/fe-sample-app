import { Action, Reducer, PayloadAction } from "@reduxjs/toolkit";

const ADD_POLICYHOLDERS = 'ADD_POLICYHOLDERS' as const;

// NOTE: lack of a proper unique id here is A BIG PROBLEM
// we'll need to address this data integrity issue
// before shipping... otherwise we can't expect to be able
// to normalize this data and ever have constant time
// random access to a single item
type PolicyHolder = {
    address: {
        line1: string,
        city: string,
        line2?: string,
        postalCode: string,
        state: string
    },
    age: number,
    isPrimary: boolean,
    name: string,
    phoneNumber: string
}

type State = Record<PolicyHolder['name'], PolicyHolder>
type PolicyHoldersReducer = Reducer<State, PayloadAction<State, typeof ADD_POLICYHOLDERS>>;

const initialValue = {},
    addPolicyHolders = (policyHoldersToAdd: State) => {
        return {
            type: ADD_POLICYHOLDERS,
            payload: policyHoldersToAdd
        }
    },
    policyHoldersReducer: PolicyHoldersReducer = (state = initialValue, action) => {
        switch(action.type) {
            case ADD_POLICYHOLDERS:
                const policyHoldersToAdd = action.payload;

                return {
                    ...state,
                    ...policyHoldersToAdd
                }
            default:
                return state;
        }
    };

export default policyHoldersReducer;

export {
    addPolicyHolders
};

export type {
    PolicyHolder
}