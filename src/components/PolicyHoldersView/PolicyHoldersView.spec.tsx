import { AxiosResponse } from 'axios';
import * as policyHoldersApi from '../../apis/policyholders/policyHolderApi';
import { renderWithProviders } from '../../utils/test';
import PolicyHoldersView, {
    Props
} from './PolicyHoldersView';

let defaultProps: Props,
    reduxData: any;

beforeEach(() => {
    defaultProps = {
        hasBeenVisited: true
    };

    reduxData = {};

    jest.spyOn(policyHoldersApi, 'getPolicyHolders').mockImplementation(() => {
        return Promise.resolve({
            data: []
        } as AxiosResponse);
    })
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

        it('should not call getPolicyHolders', () => {
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
    });
});