import { act } from "react-dom/test-utils";

export const runTimers = () => {
  act(() => {
    jest.runOnlyPendingTimers();
  });
};
