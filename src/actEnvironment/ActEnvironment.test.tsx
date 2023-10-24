import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { runTimers } from "./runTimers";
import Timers from "../timers/Timers";

jest.useFakeTimers();

describe("❌ throws current testing environment is not configured to support act error", () => {
  it("increments number at intervals", async () => {
    render(<Timers />);

    runTimers();
    await userEvent.click(screen.getByText("2"), { delay: null });
  });
});

describe("✅ correct", () => {
  it.only("increments number at intervals", async () => {
    render(<Timers />);

    act(() => {
      jest.runOnlyPendingTimers();
    });

    await userEvent.click(screen.getByText("2"), { delay: null });
  });
});
