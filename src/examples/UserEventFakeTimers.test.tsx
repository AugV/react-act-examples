import React from "react";
import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

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

describe("❌ exceeds timeout with async user event (v14)", () => {
  it("increments number at intervals", async () => {
    render(<Timers />);

    act(() => {
      jest.runOnlyPendingTimers();
    });

    await userEvent.click(screen.getByText("2"));
  });
});

describe("✅ correct", () => {
  it("increments number at intervals", async () => {
    render(<Timers />);

    act(() => {
      jest.runOnlyPendingTimers();
    });

    await userEvent.click(screen.getByText("2"), { delay: null });
  });

  it("increments number at intervals", async () => {
    render(<Timers />);

    const user = userEvent.setup({advanceTimers:jest.runOnlyPendingTimers})

    act(() => {
      jest.runOnlyPendingTimers();
    });

    await user.click(screen.getByText("2"));
  });
});
