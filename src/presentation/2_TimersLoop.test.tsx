import React from "react";
import { render, screen, act } from "@testing-library/react";

const TimersLoop = () => {
  const [content, setContent] = React.useState(0);

  React.useEffect(() => {
    setTimeout(() => {
      setContent(2);

      setTimeout(() => {
        setContent(3);

        setTimeout(() => {
          setContent(4);
        }, 5002)
      }, 1002);
    }, 1008);

    
  }, []);

  React.useEffect(() => {
    content && setTimeout(() => {
      setContent(8);
      console.log("here")
    }, 1008);
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

  expect(screen.getByText("0")).toBeTruthy();

  act(() => {
    jest.runAllTimers();
  });

  expect(screen.getByText("8")).toBeTruthy();
});
