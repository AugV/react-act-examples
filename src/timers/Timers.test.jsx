import Timers from './Timers';
import { render, screen ,act} from '@testing-library/react';

jest.useFakeTimers()

describe('timers tests with act warnings', () => {
  it('increments number at intervals', async () => {
    render(<Timers />);

    expect(screen.getByText('1')).toBeTruthy();

    jest.runOnlyPendingTimers();

    expect(screen.getByText('2')).toBeTruthy();
  });
});

describe('timers correct tests', () => {
  it('increments number at intervals', async () => {
    render(<Timers />);

    expect(screen.getByText('1')).toBeTruthy();

     act(async ()=> {
      jest.runOnlyPendingTimers();
    })

    expect(screen.getByText('2')).toBeTruthy();
  });
});
