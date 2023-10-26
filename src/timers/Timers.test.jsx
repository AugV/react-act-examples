import React from "react";
import { render, screen, act } from "@testing-library/react";

const Timers = () => {
  const [content, setContent] = React.useState(1);

  React.useEffect(() => {
    const interval = setInterval(() => setContent(content + 1), 3000);

    return () => clearInterval(interval);
  }, [content]);

  return (
    <div>
      <p>Timers</p>
      <p>{content}</p>
    </div>
  );
};

jest.useFakeTimers();

describe("❌ running timers without wrapping in act throws act warning", () => {
  it("increments number at intervals", async () => {
    render(<Timers />);

    expect(screen.getByText("1")).toBeTruthy();

    jest.runOnlyPendingTimers();

    // not using act also makes this assertion fail
    expect(screen.getByText("2")).toBeTruthy();
  });
});

describe("✅ running timers without act warning", () => {
  it("increments number at intervals", async () => {
    render(<Timers />);

    expect(screen.getByText("1")).toBeTruthy();

    act(() => {
      jest.runOnlyPendingTimers();
    });

    expect(screen.getByText("2")).toBeTruthy();
  });
});
