import React from "react";
import { render, screen, act } from "@testing-library/react";

const TimersLoop = () => {
  const [content, setContent] = React.useState("initial state");

  React.useEffect(() => {
    setTimeout(() => {
      setContent("intermediate state");
    }, 2000);
  }, []);

  React.useEffect(() => {
    content &&
      setTimeout(() => {
        setContent("final state");
      }, 1000);
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
  render(<TimersLoop />);

  expect(screen.getByText("initial state")).toBeTruthy();

  act(() => {
    jest.runAllTimers();
  });

  expect(screen.getByText("final state")).toBeTruthy();
});
