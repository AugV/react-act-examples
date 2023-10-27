import React from "react";
import { render, screen, act } from "@testing-library/react";

const TimersLoop = () => {
  const [content, setContent] = React.useState(0);

  React.useEffect(() => {
    setTimeout(() => {
      setContent(2);
    }, 2000);
  }, []);

  React.useEffect(() => {
    content &&
      setTimeout(() => {
        setContent(8);
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

  expect(screen.getByText("0")).toBeTruthy();

  await act(async () => {
    jest.runAllTimers();
  });

  expect(screen.getByText("8")).toBeTruthy();
});
