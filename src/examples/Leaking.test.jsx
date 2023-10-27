import React from "react";
import { render, screen, waitFor } from "@testing-library/react";

const Timers = () => {
  const [content, setContent] = React.useState(1);

  React.useEffect(() => {
    const interval = setInterval(() => setContent(content + 1), 500);

    return () => clearInterval(interval);
  }, [content]);

  return (
    <div>
      <p>Timers</p>
      <p>{content}</p>
    </div>
  );
};

describe("❌ not awaiting waitFor in 1st test makes 2nd fail", () => {
  it("increments number at intervals 1", async () => {
    render(<Timers />);

    expect(screen.getByText("1")).toBeTruthy();

    await waitFor(async () => {
      expect(screen.getByText("2")).toBeTruthy();
    });

    waitFor(() => {
      expect(screen.getByText("3")).toBeTruthy();
    });
  });

  it("increments number at intervals 2", async () => {
    render(<Timers />);

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
    render(<Timers />);

    expect(screen.getByText("1")).toBeTruthy();

    await waitFor(async () => {
      expect(screen.getByText("2")).toBeTruthy();
    });

    await waitFor(async () => {
      expect(screen.getByText("3")).toBeTruthy();
    });
  });

  it("increments number at intervals", async () => {
    render(<Timers />);

    expect(screen.getByText("1")).toBeTruthy();

    await waitFor(async () => {
      expect(screen.getByText("2")).toBeTruthy();
    });

    await waitFor(async () => {
      expect(screen.getByText("3")).toBeTruthy();
    });
  });
});
