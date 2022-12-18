import { ReactElement } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import { Provider } from 'react-redux';
// import { RootState } from '../redux/store';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../redux/reducers';

export const renderWithProviders = (
  ui: ReactElement,
  opts: Partial<Parameters<typeof render>[1]> = {},
  routerOpts: React.ComponentProps<typeof MemoryRouter> = {}
) => render(<MemoryRouter {...routerOpts}>{ui}</MemoryRouter>, opts),
  renderHookWithProviders = (
    hook: (...args: any) => any,
    hookArgs: any[] = [],
    preloadedState: any = {},
    routerOpts: React.ComponentProps<typeof MemoryRouter> = {}
  ) => {
    return renderHook(() => {
      const store = configureStore({
        reducer: rootReducer,
        preloadedState
      });

      const wrapper = (props: any) => {
        const {children} = props;

        return (
          <Provider store={store}>
            <MemoryRouter {...routerOpts} >
              {children}
            </MemoryRouter>
          </Provider>
        );
      }
      
      return renderHook(() => hook(...hookArgs), { wrapper })
    })
  }
