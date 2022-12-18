import {
    renderHookWithProviders
} from '../utils/test';
import useOnRouteMount from './useOnRouteMount';

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
        renderHookWithProviders(useOnRouteMount, [defaultData], reduxData);

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
        renderHookWithProviders(useOnRouteMount, [defaultData], reduxData, {
            initialEntries: ['/']
        });

        expect(defaultData).not.toHaveBeenCalled();
    })
});