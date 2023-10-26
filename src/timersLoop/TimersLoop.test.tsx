import React from "react";
import { render, screen, act } from "@testing-library/react";
import { runAbsolutelyAllTimers } from "../utils/runAbsolutelyAllTimers";

const TimersLoop = () => {
  const [content, setContent] = React.useState(1);

  React.useEffect(() => {
    const interval = setTimeout(() => {
      console.log("timeout 1");
      setContent(2);

      setTimeout(() => {
        console.log("timeout 2");
        setContent(3);
      }, 2000);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <p>TimersLoop</p>
      <p>{content}</p>
    </div>
  );
};

jest.useFakeTimers();

describe("timersloop tests with act warnings", () => {
  it("run only first timer", async () => {
    render(<TimersLoop />);

    expect(screen.getByText("1")).toBeTruthy();

    await act(async () => {
      jest.runOnlyPendingTimers();
    });

    expect(screen.getByText("3")).toBeTruthy();
  });
});

describe("timersloop correct tests", () => {
  it("runs all timers", async () => {
    render(<TimersLoop />);

    expect(screen.getByText("1")).toBeTruthy();

    await act(async () => {
      jest.runOnlyPendingTimers();
    });

    await act(async () => {
      jest.runOnlyPendingTimers();
    });

    expect(screen.getByText("3")).toBeTruthy();
  });

  it("runs all timers with util function", async () => {
    render(<TimersLoop />);

    expect(screen.getByText("1")).toBeTruthy();

    await runAbsolutelyAllTimers();

    expect(screen.getByText("3")).toBeTruthy();
  });
});
