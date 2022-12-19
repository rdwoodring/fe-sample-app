import axios from 'axios';

import {
    PolicyHolder
} from '../../redux/reducers/policyHolders';

const baseUrlRaw = 'https://fe-interview-technical-challenge-api-git-main-sure.vercel.app/';

function getPolicyHolders() {
    const url = new URL('api/policyholders', baseUrlRaw);

    return axios.get<{
        policyHolders: PolicyHolder[]
    }>(url.href);
}

function savePolicyHolder(policyHolder: Omit<PolicyHolder, 'isPrimary'>) {
    const url = new URL('api/policyholders', baseUrlRaw);

    return axios.post<{
        policyHolders: PolicyHolder[]
    }>(url.href, policyHolder);
}

export {
    getPolicyHolders,
    savePolicyHolder
};