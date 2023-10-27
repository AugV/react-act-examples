import React from "react";
import { render, screen, act, waitFor } from "@testing-library/react";

const TimersLoop = () => {
  const [content, setContent] = React.useState<string | undefined>();

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

describe("❌ timersloop tests with act warnings", () => {
  it("increments number at intervals", async () => {
    render(<TimersLoop />);
  
    act(() => {
      jest.runAllTimers();
    });
  
    expect(screen.getByText("final state")).toBeTruthy();
  });
});

describe("✅ timersloop correct tests", () => {
  it("increments number at intervals", async () => {
    render(<TimersLoop />);
  
    act(() => {
      jest.runAllTimers();
    });

    act(() => {
      jest.runAllTimers();
    });
  
    expect(screen.getByText("final state")).toBeTruthy();
  });

  it("awaits element with waitFor", async () => {
    render(<TimersLoop />);

    await waitFor(() => {
      expect(screen.getByText("final state")).toBeTruthy();
    }, { timeout: 6000 })
  });
});
