import { ReactElement } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';

export const renderWithProviders = (
  ui: ReactElement,
  opts: Partial<Parameters<typeof render>[1]> = {},
  routerOpts: React.ComponentProps<typeof MemoryRouter> = {}
) => render(<MemoryRouter {...routerOpts}>{ui}</MemoryRouter>, opts);
