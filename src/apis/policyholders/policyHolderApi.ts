import axios from 'axios';

const baseUrlRaw = 'https://fe-interview-technical-challenge-api-git-main-sure.vercel.app/';

function getPolicyHolders() {
    const url = new URL('api/policyholders', baseUrlRaw);

    return axios.get(url.href);
}

export {
    getPolicyHolders
};