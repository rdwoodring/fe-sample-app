import { useCallback, useMemo } from 'react';
import {
    getPolicyHolders, savePolicyHolder
} from './policyHolderApi';

import {
    addPolicyHolders, PolicyHolder
} from '../../redux/reducers/policyHolders';

import {
    UnwrapArray
} from '../../utils/types';

import normalize from '../../utils/normalizer';
import { useAppDispatch } from '../../hooks/useAppDispatch';

function usePolicyHolderApi() {
    const dispatch = useAppDispatch(),
        // TODO: this will become a more generalized utility function
        // as we add more entity types to the app (i.e. policies etc.)
        normalizeAndInsert = useCallback((policyHolders: PolicyHolder[]) => {
            const normalized = normalize<UnwrapArray<typeof policyHolders>>('name', policyHolders);

            dispatch(addPolicyHolders(normalized));
        }, [
            dispatch
        ]),
        getPolicyHoldersWrapped = useCallback<typeof getPolicyHolders>(async () => {
            const response = await getPolicyHolders(),
                {
                    data: {
                        policyHolders
                    }
                } = response;

            normalizeAndInsert(policyHolders);

            return response;
        }, [
            normalizeAndInsert
        ]),
        savePolicyHolderWrapped = useCallback<typeof savePolicyHolder>(async (policyHolder) => {
            const response = await savePolicyHolder(policyHolder),
                {
                    data: {
                        policyHolders
                    }
                } = response;

            normalizeAndInsert(policyHolders);

            return response;
        }, [
            normalizeAndInsert
        ]);

    return useMemo(() => {
        return {
            getPolicyHolders: getPolicyHoldersWrapped,
            savePolicyHolder: savePolicyHolderWrapped
        }
    }, [
        getPolicyHoldersWrapped,
        savePolicyHolderWrapped
    ]);
}

export default usePolicyHolderApi;