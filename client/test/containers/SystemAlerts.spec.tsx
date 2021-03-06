import React from 'react';
import { config } from 'react-transition-group';

import { AppActionTypes } from 'literals';

import { showAlert } from 'actions/app.action';

import SystemAlerts from 'containers/SystemAlerts';

import { fireEvent, render, screen } from 'test-utils';

config.disabled = true;

jest.mock('components/Transition', () => ({ children }) => (
  <div className="transition">{children}</div>
));

jest.useFakeTimers();

const mockDispatch = jest.fn();

describe('SystemAlerts', () => {
  it('should render all zones', () => {
    const { container } = render(<SystemAlerts />);

    expect(container).toMatchSnapshot();
  });

  it('should render an alert and hide itself after the timeout', async () => {
    render(<SystemAlerts />, {
      actions: [
        showAlert('Hello World', {
          position: 'top-left',
          variant: 'success',
        }),
      ],
      mockDispatch,
    });

    expect(screen.queryByRole('alert')).toBeInTheDocument();

    jest.runOnlyPendingTimers();

    expect(mockDispatch).toHaveBeenCalledWith({
      type: AppActionTypes.HIDE_ALERT,
      payload: { id: 'ABCDEF' },
    });

    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });

  it('should render an alert without timeout and close it', () => {
    render(<SystemAlerts />, {
      actions: [
        showAlert('Hello Mars', {
          id: 'ABD13',
          position: 'bottom-right',
          variant: 'dark',
          timeout: 0,
        }),
      ],
      mockDispatch,
    });

    expect(screen.queryByRole('alert')).toBeInTheDocument();

    fireEvent.click(screen.queryByRole('alert')?.querySelector('button')!);

    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });
});
