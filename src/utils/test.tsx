import { ReactElement } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../redux/reducers';

// TODO: this is a mess. Really should come back in here and find
// a better way to compose these different providers
export const renderWithProviders = (
  ui: ReactElement,
  opts: Partial<Parameters<typeof render>[1]> = {},
  routerOpts: React.ComponentProps<typeof MemoryRouter> = {},
  preloadedState: any = {}
) => {
  const store = configureStore({
    reducer: rootReducer,
    preloadedState
  });

  return render(
    <Provider store={store}>
      <MemoryRouter {...routerOpts}>
        {ui}
      </MemoryRouter>,
    </Provider>,
    opts
  )
},
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
