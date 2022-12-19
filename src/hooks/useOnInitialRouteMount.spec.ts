import {
    renderHookWithProviders
} from '../utils/test';
import useOnInitialRouteMount from './useOnInitialRouteMount';

let reduxData: any,
    defaultData: any;

beforeEach(() => {
    reduxData = {
        visitedRoutes: {}
    };

    defaultData = jest.fn();
});

describe('when the route has not yet been visited', () => {
    it('should call the function', () => {
        renderHookWithProviders(useOnInitialRouteMount, [defaultData], reduxData);

        expect(defaultData).toHaveBeenCalled();
    });
});

describe('when the route has been visited', () => {
    beforeEach(() => {
        reduxData = {
            visitedRoutes: {
                '/': 77
            }
        };
    });

    it('should not call the function', () => {
        renderHookWithProviders(useOnInitialRouteMount, [defaultData], reduxData, {
            initialEntries: ['/']
        });

        expect(defaultData).not.toHaveBeenCalled();
    })
});