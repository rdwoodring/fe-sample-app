import { getPolicyHolders } from '../../apis/policyholders/policyHolderApi';

import useOnInitialRouteMount from '../../hooks/useOnInitialRouteMount';

type Props = {

}

function PolicyHoldersView(props: Props) {
    useOnInitialRouteMount(getPolicyHolders);

    return null;
}

export default PolicyHoldersView;
export type {
    Props
}