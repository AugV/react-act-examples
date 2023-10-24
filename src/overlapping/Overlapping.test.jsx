import Timers from "../timers/Timers";
import { render, screen, act, waitFor } from "@testing-library/react";

jest.useFakeTimers();

describe("❌ overlapping act calls", () => {
  it("increments number at intervals", async () => {
    render(<Timers />);

    waitFor(async () => {
      expect(await screen.findByText("1")).toBeTruthy();
    });
    await act(async () => {
      jest.runOnlyPendingTimers();
    });

    expect(screen.getByText("2")).toBeTruthy();
  });
});

describe("✅ act calls do not overlap when awaited", () => {
  it("increments number at intervals", async () => {
    render(<Timers />);

    await waitFor(async () => {
      expect(await screen.findByText("1")).toBeTruthy();
    });
    await act(async () => {
      jest.runOnlyPendingTimers();
    });

    expect(screen.getByText("2")).toBeTruthy();
  });
});
