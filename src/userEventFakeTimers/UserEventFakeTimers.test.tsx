import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Timers from "../timers/Timers";

jest.useFakeTimers();

describe("exceeds timeout with async user event (v14)", () => {
  it("increments number at intervals", async () => {
    render(<Timers />);

    act(() => {
      jest.runOnlyPendingTimers();
    });

    await userEvent.click(screen.getByText("2"));
  });
});

describe("correct", () => {
  it("increments number at intervals", async () => {
    render(<Timers />);

    act(() => {
      jest.runOnlyPendingTimers();
    });

    await userEvent.click(screen.getByText("2"), { delay: null });
  });
});
