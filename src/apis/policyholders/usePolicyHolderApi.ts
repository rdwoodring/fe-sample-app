import { useCallback, useMemo } from 'react';
import {
    getPolicyHolders, savePolicyHolder
} from './policyHolderApi';

import {
    addPolicyHolders
} from '../../redux/reducers/policyHolders';

import {
    UnwrapArray
} from '../../utils/types';

import normalize from '../../utils/normalizer';
import { useAppDispatch } from '../../hooks/useAppDispatch';

function usePolicyHolderApi() {
    const dispatch = useAppDispatch(),
        getPolicyHoldersWrapped = useCallback<typeof getPolicyHolders>(async () => {
            const response = await getPolicyHolders(),
                {
                    data: {
                        policyHolders
                    }
                } = response,
                
            normalized = normalize<UnwrapArray<typeof policyHolders>>('name', policyHolders);

            dispatch(addPolicyHolders(normalized));

            return response;
        }, [
            dispatch
        ]),
        savePolicyHolderWrapped = useCallback<typeof savePolicyHolder>(async (policyHolder) => {
            const response = await savePolicyHolder(policyHolder),
                {
                    data: {
                        policyHolders
                    }
                } = response,
                normalized = normalize<UnwrapArray<typeof policyHolders>>('name', policyHolders);

            dispatch(addPolicyHolders(normalized));

            return response;
        }, [
            dispatch
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