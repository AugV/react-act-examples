import React from "react";
import { userEvent } from "@testing-library/user-event";
import { render, screen, waitFor } from "@testing-library/react";

const NoAwait = () => {
  const [isContentVisible, setIsContentVisible] = React.useState(false);

  return (
    <div>
      <p>NoAwait</p>
      <button
        onClick={() => {
          setTimeout(() => {
            // intentionally incorrect
            setIsContentVisible(true);
          }, 500);
        }}
      >
        Toggle content
      </button>
      {isContentVisible ? <div>Content</div> : null}
    </div>
  );
};

// ❗ False positives also occur when not awaiting eventually

describe("❌ false positive when not awaiting waitFor", () => {
  it("toggles content on button click", async () => {
    render(<NoAwait />);

    await userEvent.click(screen.getByRole("button"));

    await waitFor(() => {
      expect(screen.getByText("Content")).toBeTruthy();
    });

    await userEvent.click(screen.getByRole("button"));

    waitFor(() => {
      expect(screen.queryByText("Content")).toBeFalsy();
    });
  });
});

describe("✅ test detects the bug and fails when awaiting waitFor", () => {
  it("toggles content on button click", async () => {
    render(<NoAwait />);

    await userEvent.click(screen.getByRole("button"));

    await waitFor(() => {
      expect(screen.getByText("Content")).toBeTruthy();
    });

    await userEvent.click(screen.getByRole("button"));

    await waitFor(async () => {
      expect(screen.queryByText("Content")).toBeFalsy();
    });
  });
});
