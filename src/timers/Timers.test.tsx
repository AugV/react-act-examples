import Timers from './Timers';
import { render, screen } from '@testing-library/react';

jest.useFakeTimers()

describe('timers tests with act warnings', () => {
  it('increments number at intervals', async () => {
    render(<Timers />);

    expect(screen.getByText('1')).toBeInTheDocument();

    jest.runOnlyPendingTimers();

    expect(screen.getByText('2')).toBeInTheDocument();
  });
});

describe('timers correct tests', () => {
  it('increments number at intervals', async () => {
    render(<Timers />);

    expect(screen.getByText('1')).toBeInTheDocument();

    // act(()=> {

    // })
    jest.runOnlyPendingTimers();

    expect(screen.getByText('2')).toBeInTheDocument();
  });
});