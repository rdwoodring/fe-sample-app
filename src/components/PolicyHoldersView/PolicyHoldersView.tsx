import usePolicyHolderApi from '../../apis/policyholders/usePolicyHolderApi';
import { useAppSelector } from '../../hooks/useAppSelector';
import useLoadUntilDataExists from '../../hooks/useLoadingUntilDataExists';

import useOnInitialRouteMount from '../../hooks/useOnInitialRouteMount';
import { UnwrapArray, UnwrapRecord } from '../../utils/types';

import {Box, Button, List, ListItem, Typography, ListItemText, ListSubheader} from '@mui/material';
import InfoTable from '../InfoTable';
import { useCallback } from 'react';

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
        getPolicyHolders,
        savePolicyHolder
    } = usePolicyHolderApi(),
    policyHolders = useAppSelector(state => state.policyHolders),
    loading = useLoadUntilDataExists(policyHolders),
    handleAddNewPolicyHolder = useCallback(async () => {
        await savePolicyHolder({
            name: 'Luke Skywalker',
            address: {
                line1: '1 Burned Moisture Farm',
                line2: 'sand',
                city: 'Near Mos Eisley',
                state: 'TT',
                postalCode: '12345'
            },
            age: 18,
            phoneNumber: '111-JEDI-4-HIRE'
        });
    }, [
        savePolicyHolder
    ]);

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

            return (
                <Box key={policyHolder.name} sx={{
                    paddingBottom: '32px'
                }}>
                    <InfoTable header={policyHolder.name} rows={rows} />
                </Box>
            )
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
        <Box>
            <Box sx={{textAlign: 'center'}}>
                {markup}
            </Box>
            <Box sx={{
                paddingTop: '16px',
                textAlign: 'center'
            }}>
                <Button
                    onClick={handleAddNewPolicyHolder}
                    variant="contained"
                    color="primary"
                    size="large"
                >
                    Add a policyholder
                </Button>
            </Box>

            <Box sx={{
                paddingTop: '16px'
            }}>
                <List>
                    <ListSubheader>
                        Remaining TODOs:
                    </ListSubheader>
                    <ListItem>
                        <ListItemText>
                            Add more granular tests to all of the hooks created (mostly tested right now through the components that use them)
                        </ListItemText>
                    </ListItem>
                    <ListItem>
                        <ListItemText>
                            Create a generic utility for normalizing and inserting data into redux
                        </ListItemText>
                    </ListItem>
                    <ListItem>
                        <ListItemText>
                            Sync with the back end team on providing a unique identifier with each policy holder record
                        </ListItemText>
                    </ListItem>
                    <ListItem>
                        <ListItemText>
                            Handle currently un handled case where no results are returned from the policy holder request
                        </ListItemText>
                    </ListItem>
                    <ListItem>
                        <ListItemText>
                            Better handling of loading state during initial get request for policy holders
                        </ListItemText>
                    </ListItem>
                    <ListItem>
                        <ListItemText>
                            Better handling of loading state during post request to save new policy holder
                        </ListItemText>
                    </ListItem>
                    <ListItem>
                        <ListItemText>
                            Add error handling and provide error messages to end users when get/post requests fail
                        </ListItemText>
                    </ListItem>
                    <ListItem>
                        <ListItemText>
                            General sweep for accessibility gaps like low contrast, missing semantic elements/aria/roles
                        </ListItemText>
                    </ListItem>
                    
                </List>
            </Box>
        </Box>
    );
}

export default PolicyHoldersView;
export type {
    Props
}