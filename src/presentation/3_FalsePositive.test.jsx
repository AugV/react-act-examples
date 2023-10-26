import React from "react";
import { userEvent } from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";

const ToggleContent = () => {
  const [isContentVisible, setIsContentVisible] = React.useState(false);

  return (
    <div>
      <button
        onClick={() => {
          setTimeout(() => {
            // intentionally incorrect - bug here
            setIsContentVisible(prev => prev);
          }, 500); 
        }}
      >
        Toggle content
      </button>
      {isContentVisible ? <div>Content</div> : null}
    </div>
  );
};

it("toggles content on button click", async () => {
  render(<ToggleContent />);

  expect(screen.queryByText("Content")).toBeFalsy();
  
  await userEvent.click(screen.getByRole("button"));

  expect(screen.queryByText("Content")).toBeTruthy();
});