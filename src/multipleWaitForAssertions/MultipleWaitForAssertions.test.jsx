import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";

const MultipleWaitForAssertionsFunction = ({ onClick }) => {
  return (
    <button
      onClick={() => {
        setTimeout(() => {
          onClick("test");
        }, 500);
      }}
    >
      Test
    </button>
  );
};

describe("with function callback", () => {
  it("❌ having multiple assertions in waitFor makes test takes longer to fail", async () => {
    const onClick = jest.fn();
    render(<MultipleWaitForAssertionsFunction onClick={onClick} />);

    await userEvent.click(screen.getByRole("button"));

    await waitFor(() => {
      expect(onClick).toHaveBeenCalledTimes(1);
      expect(onClick).toHaveBeenCalledWith("foo");
    });
  });

  it("✅ fails faster when single assertion is used inside waitFor", async () => {
    const onClick = jest.fn();
    render(<MultipleWaitForAssertionsFunction onClick={onClick} />);

    await userEvent.click(screen.getByRole("button"));

    await waitFor(() => {
      expect(onClick).toHaveBeenCalledWith("foo");
    });

    expect(onClick).toHaveBeenCalledTimes(1);
  });
});

const MultipleWaitForAssertionsElement = () => {
  const [isButtonVisible, setIsButtonVisible] = React.useState(false);

  React.useEffect(() => {
    setTimeout(() => {
      setIsButtonVisible(true);
    }, 500);
  }, []);

  return (
    <div>
      <h1>Title</h1>
      <p>Description</p>
      {isButtonVisible ? <button>Test</button> : <div>Loading button</div>}
    </div>
  );
};

describe("with asynchronously rendered element", () => {
  it("❌ querying syncronously rendered elements in waitFor", async () => {
    render(<MultipleWaitForAssertionsElement />);

    await waitFor(() => {
      expect(screen.getByText("Title")).toBeTruthy();
      expect(screen.getByText("Description")).toBeTruthy();
      expect(screen.getByRole("button")).toBeTruthy();
      expect(screen.queryByText("Loading button")).toBeFalsy();
    });
  });

  it("✅ single query for asynchronously rendered element", async () => {
    const onClick = jest.fn();
    render(<MultipleWaitForAssertionsElement onClick={onClick} />);

    expect(screen.getByText("Title")).toBeTruthy();
    expect(screen.getByText("Description")).toBeTruthy();

    await waitFor(() => {
      expect(screen.getByRole("button")).toBeTruthy();
    });

    expect(screen.queryByText("Loading button")).toBeFalsy();
  });
});
