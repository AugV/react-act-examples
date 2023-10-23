import TimersLoop from './TimersLoop';
import { render, screen ,act} from '@testing-library/react';

jest.useFakeTimers()

describe('timersloop tests with act warnings', () => {
  it('run only first timer', async () => {
    render(<TimersLoop />);

    expect(screen.getByText('1')).toBeTruthy();

     await act(async ()=> {
      jest.runOnlyPendingTimers();
    })

    expect(screen.getByText('3')).toBeTruthy();
  });
});

describe('timersloop correct tests', () => {
  it.only('runs all timers', async () => {
    render(<TimersLoop />);

    expect(screen.getByText('1')).toBeTruthy();

     await act(async ()=> {
      jest.runOnlyPendingTimers();
    })

     await act(async ()=> {
      jest.runOnlyPendingTimers();
    })

    expect(screen.getByText('3')).toBeTruthy();
  });
});
