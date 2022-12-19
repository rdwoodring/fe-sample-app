import { AxiosResponse } from 'axios';
import * as policyHoldersApi from '../../apis/policyholders/policyHolderApi';
import { renderWithProviders } from '../../utils/test';
import PolicyHoldersView, {
    Props
} from './PolicyHoldersView';

import {
    screen
} from '@testing-library/react'
import userEvent from '@testing-library/user-event';

let defaultProps: Props,
    reduxData: any;

beforeEach(() => {
    defaultProps = {
        hasBeenVisited: true
    };

    reduxData = {};

    jest.spyOn(policyHoldersApi, 'getPolicyHolders').mockImplementation(() => {
        return Promise.resolve({
            data: {
                policyHolders: [
                    {
                        name: "Mrs. Holder",
                        age: 29,
                        address: {
                            line1: "123 Lane Ave",
                            line2: "3H",
                            city: "Santa Monica",
                            state: "CA",
                            postalCode: "90405",
                        },
                        phoneNumber: "1-989-989-9898",
                        isPrimary: true,
                    }
                ]
            }
             
        } as AxiosResponse);
    })

    jest.spyOn(policyHoldersApi, 'savePolicyHolder').mockImplementation(() => {
        return Promise.resolve({
            data: {
                policyHolders: [
                    {
                        name: "Mrs. Holder",
                        age: 29,
                        address: {
                            line1: "123 Lane Ave",
                            line2: "3H",
                            city: "Santa Monica",
                            state: "CA",
                            postalCode: "90405",
                        },
                        phoneNumber: "1-989-989-9898",
                        isPrimary: true,
                    },
                    {
                        name: 'Luke Skywalker',
                        address: {
                            line1: '1 Burned Moisture Farm',
                            line2: 'sand',
                            city: 'Near Mos Eisley',
                            state: 'TT',
                            postalCode: '12345'
                        },
                        age: 18,
                        isPrimary: false,
                        phoneNumber: '111-JEDI-4-HIRE'
                    }
                ]
            }
             
        } as AxiosResponse);
    })
});

it('should render an add a policyholder button', () => {
    renderWithProviders(
        <PolicyHoldersView {...defaultProps} />,
        {},
        {
            initialEntries: ['/policyholders']
        },
        reduxData
    );

    expect(screen.getByRole('button', {
        name: 'Add a policyholder'
    })).toBeTruthy();
});

describe('when clicking the add a policy holder button', () => {
    it('should call savePolicyHolder', () => {
        renderWithProviders(
            <PolicyHoldersView {...defaultProps} />,
            {},
            {
                initialEntries: ['/policyholders']
            },
            reduxData
        );
    
        userEvent.click(screen.getByRole('button', {
            name: 'Add a policyholder'
        }));

        expect(policyHoldersApi.savePolicyHolder).toHaveBeenCalled();
    });
});

describe('when the component mounts', () => {
    describe('when the policy holders route has been visited already in the visited routes tracking', () => {
        beforeEach(() => {
            reduxData = {
                ...reduxData,
                visitedRoutes: {
                    '/policyholders': 11
                }
            };
        });

        it('should not call getPolicyHolders', () => {
            renderWithProviders(
                <PolicyHoldersView {...defaultProps} />,
                {},
                {
                    initialEntries: ['/policyholders']
                },
                reduxData
            );
        
            expect(policyHoldersApi.getPolicyHolders).not.toHaveBeenCalled();
        });
    });

    describe('when the policy holders route has been not visited already in the visited routes tracking', () => {
        beforeEach(() => {
            reduxData = {
                ...reduxData,
                visitedRoutes: {}
            };
        });

        it('should call getPolicyHolders', () => {
            renderWithProviders(
                <PolicyHoldersView {...defaultProps} />,
                {},
                {
                    initialEntries: ['/policyholders']
                },
                reduxData
            );
        
            expect(policyHoldersApi.getPolicyHolders).toHaveBeenCalled();
        });

        it('should render a loading state while waiting', () => {
            renderWithProviders(
                <PolicyHoldersView {...defaultProps} />,
                {},
                {
                    initialEntries: ['/policyholders']
                },
                reduxData
            );

            expect(screen.getByText('Loading...')).toBeTruthy();
        })

        it('should render the results', async () => {
            renderWithProviders(
                <PolicyHoldersView {...defaultProps} />,
                {},
                {
                    initialEntries: ['/policyholders']
                },
                reduxData
            );

            await screen.findAllByText('Mrs. Holder');

            expect(screen.getByText('Name')).toBeTruthy();
            expect(screen.getByText('Age')).toBeTruthy();
            expect(screen.getByText('Address')).toBeTruthy();
            expect(screen.getByText('Phone number')).toBeTruthy();
            expect(screen.getByText('Primary policyholder?')).toBeTruthy();

            expect(screen.getByText('29')).toBeTruthy();
            expect(screen.getByText('123 Lane Ave, 3H, Santa Monica, CA 90405')).toBeTruthy();
            expect(screen.getByText('1-989-989-9898')).toBeTruthy();
            expect(screen.getByText('true')).toBeTruthy();
        })
    });
});