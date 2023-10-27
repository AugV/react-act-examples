import React from "react";
import { render, screen, act, waitFor } from "@testing-library/react";
import { Simulate } from "react-dom/test-utils";

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
      <button>Button</button>
    </div>
  );
};

jest.useFakeTimers();

it("increments number at intervals", async () => {
  render(<Timers />);

  waitFor(async () => {
    expect(screen.getByText("1")).toBeTruthy();
  });



  expect(screen.getByText("2")).toBeTruthy();
});


it("increments number at intervals", async () => {
  render(<Timers />);
  const clickButton = async (element) => {
    return act(async () => {
      Simulate.click(element);
    })
  }
  
  clickButton(screen.getByRole('button'))

  await act(async () => {
    jest.runOnlyPendingTimers();
  });

  expect(screen.getByText("2")).toBeTruthy();
});
