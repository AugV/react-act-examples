import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

export const TestComponent = () => {
  const [showTooltip, setShowTooltip] = React.useState(false);

  return (
    <>
      <button
        onFocus={() => setTimeout(() => setShowTooltip(true), 10)}
        onBlur={() => setShowTooltip(false)}
      >
        First Button
      </button>
      <button>Second Button</button>
      <button>Third Button</button>
      {showTooltip && <div>Ultimate tooltip</div>}
    </>
  );
};

it("opens tooltip", async () => {
  const user = userEvent.setup();
  render(<TestComponent />);

  await waitFor(async () => {
    await user.tab();
    expect(screen.getByText("Ultimate tooltip")).toBeTruthy();
  });
});
