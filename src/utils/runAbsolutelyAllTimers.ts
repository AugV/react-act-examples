import { act } from "@testing-library/react";

// This is needed because animation libraries have complex internal behaviour involving timers.
// This allows us to resolve all the timers, before our test expectations
export const runAbsolutelyAllTimers = async (params = { limit: 10 }) => {
  let i = 0;
  for (i; jest.getTimerCount() && i < params.limit; i++) {
    await act(async () => {
      jest.runAllTimers();
    });
  }
  if (i >= params.limit) {
    throw Error(
      "Exceeded custom runAllTimers() call limit. Most likely you have recursive timers, try using jest.runOnlyPendingTimers() instead."
    );
  }
};
