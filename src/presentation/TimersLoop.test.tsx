import React from "react";
import { render, screen, act } from "@testing-library/react";

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

it("increments number at intervals", async () => {
  render(<TimersLoop />);

  expect(screen.getByText("1")).toBeTruthy();

  await act(async () => {
    jest.runOnlyPendingTimers();
  });

  expect(screen.getByText("3")).toBeTruthy();
});
