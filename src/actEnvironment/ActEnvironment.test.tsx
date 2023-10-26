import React from "react";
import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { runTimers } from "./runTimers";

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
