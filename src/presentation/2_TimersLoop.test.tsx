import React from "react";
import { render, screen, act } from "@testing-library/react";

const TimersLoop = () => {
  const [content, setContent] = React.useState("initial state");

  React.useEffect(() => {
    setTimeout(() => {
      setContent("intermediate state");

      setTimeout(() => {
        setContent("sub intermediate state");
      }, 1000);
    }, 1000);
  }, []);

  React.useEffect(() => {
    content &&
      setTimeout(() => {
        setContent("final state");
      }, 2000);
  }, [content]);

  return (
    <div>
      <p>TimersLoop</p>
      <p>{content}</p>
    </div>
  );
};

jest.useFakeTimers();

it("increments number at intervals", async () => {
  jest.useFakeTimers();
  render(<TimersLoop />);

  expect(screen.getByText("initial state")).toBeTruthy();

  await act(async () => {
    jest.runAllTimers();
  });

  expect(screen.getByText("final state")).toBeTruthy();
});
