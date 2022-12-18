import { renderHook } from '@testing-library/react-hooks';
import useOnMount from './useOnMount';

let defaultData: () => void;

beforeEach(() => {
    defaultData = jest.fn();
});

it('should call the callback passed in', () => {
    renderHook(() => useOnMount(defaultData));

    expect(defaultData).toHaveBeenCalled();
});

it('should not be called twice (only on mount)', () => {
    const { 
        rerender
    } = renderHook(() => useOnMount(defaultData));

    rerender();

    expect(defaultData).not.toHaveBeenCalledTimes(2);
})