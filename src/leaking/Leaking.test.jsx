import Timers from "../timers/Timers";
import { render, screen, waitFor } from "@testing-library/react";

describe("❌ not awaiting waitFor in 1st test makes 2nd fail", () => {
  it("increments number at intervals 1", async () => {
    render(<Timers delay={500} />);

    expect(screen.getByText("1")).toBeTruthy();

    await waitFor(async () => {
      expect(screen.getByText("2")).toBeTruthy();
    });

    waitFor(() => {
      expect(screen.getByText("3")).toBeTruthy();
    });
  });

  it("increments number at intervals 2", async () => {
    render(<Timers delay={500} />);

    expect(screen.getByText("1")).toBeTruthy();

    await waitFor(async () => {
      expect(screen.getByText("2")).toBeTruthy();
    });

    await waitFor(async () => {
      expect(screen.getByText("3")).toBeTruthy();
    });
  });
});

describe("✅ awaiting waitFor fixes the leak", () => {
  it("increments number at intervals", async () => {
    render(<Timers delay={500} />);

    expect(screen.getByText("1")).toBeTruthy();

    await waitFor(async () => {
      expect(screen.getByText("2")).toBeTruthy();
    });

    await waitFor(async () => {
      expect(screen.getByText("3")).toBeTruthy();
    });
  });

  it("increments number at intervals", async () => {
    render(<Timers delay={500} />);

    expect(screen.getByText("1")).toBeTruthy();

    await waitFor(async () => {
      expect(screen.getByText("2")).toBeTruthy();
    });

    await waitFor(async () => {
      expect(screen.getByText("3")).toBeTruthy();
    });
  });
});
