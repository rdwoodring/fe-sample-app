import { renderHook } from '@testing-library/react-hooks';
import useInitializing from './useInitializing';

it('should return an initializing value that is true initially', () => {
    const {
        result
    } = renderHook(() => useInitializing());

    expect(result.all[0]).toBe(true);
});

it('should return an initializing value that becomes false', () => {
    const {
        result
    } = renderHook(() => useInitializing());

    expect(result.all[1]).toBe(false);
});