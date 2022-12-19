import usePolicyHolderApi from '../../apis/policyholders/usePolicyHolderApi';
import { useAppSelector } from '../../hooks/useAppSelector';
import useLoadUntilDataExists from '../../hooks/useLoadingUntilDataExists';

import useOnInitialRouteMount from '../../hooks/useOnInitialRouteMount';
import { UnwrapArray, UnwrapRecord } from '../../utils/types';

import {Box} from '@mui/material';
import InfoTable from '../InfoTable';

type Props = {

}

const fieldLabelPrettyTranslation = {
    'name': 'Name',
    'age': 'Age',
    'flattenedAddress': 'Address',
    'phoneNumber': 'Phone number',
    'isPrimary': 'Primary policyholder?'
}

function PolicyHoldersView(props: Props) {
    const {
        getPolicyHolders
    } = usePolicyHolderApi(),
    policyHolders = useAppSelector(state => state.policyHolders),
    loading = useLoadUntilDataExists(policyHolders);

    useOnInitialRouteMount(getPolicyHolders);

    
    function generatePolicyHolderInfoTables() {
        function generatePolicyHolderInfoTable(policyHolder: UnwrapRecord<typeof policyHolders>) {
            const {
                address: {
                    line1,
                    line2,
                    city,
                    state,
                    postalCode
                }
            } = policyHolder,
            policyHolderWithFlattenedAddress: typeof policyHolder & {
                flattenedAddress: string
            } = {
                ...policyHolder,
                flattenedAddress: `${line1}, ${line2}, ${city}, ${state} ${postalCode}`
            },
            policyHolderFields: Array<Exclude<keyof typeof policyHolderWithFlattenedAddress, 'address'>> = [
                'name',
                'age',
                'flattenedAddress',
                'phoneNumber',
                'isPrimary'
            ],
            rows = policyHolderFields.map(fieldname => {
                return {
                    key: fieldLabelPrettyTranslation[fieldname],
                    value: String(policyHolderWithFlattenedAddress[fieldname])
                }
            });

            return <InfoTable header={policyHolder.name} rows={rows} />
        }
        
        return Object.values(policyHolders).map(generatePolicyHolderInfoTable)
    }

    let markup;

    if (loading) {
        markup = (
            <div>
                Loading...
            </div>
        )
    } else {
        markup = generatePolicyHolderInfoTables();
    }

    return (
        <Box sx={{textAlign: 'center'}}>
            {markup}
        </Box>
    );
}

export default PolicyHoldersView;
export type {
    Props
}