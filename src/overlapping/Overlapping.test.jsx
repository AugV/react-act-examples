import Timers from '../timers/Timers';
import { render, screen ,act, waitFor} from '@testing-library/react';

jest.useFakeTimers()


describe('overlapping act calls', () => {
  it.only('increments number at intervals', async () => {
    render(<Timers />);

    expect(screen.getByText('1')).toBeTruthy();

   waitFor(async()=>{
    expect(await screen.findByText('1')).toBeTruthy();

  })
    await act(async ()=> {
      jest.runOnlyPendingTimers();
    })

    expect(screen.getByText('2')).toBeTruthy();
  });
});