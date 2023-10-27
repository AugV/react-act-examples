import React from "react";
import { userEvent } from "@testing-library/user-event";
import { render, screen, waitFor } from "@testing-library/react";

const ToggleContent = () => {
  const [isContentVisible, setIsContentVisible] = React.useState(false);

  return (
    <div>
      <button
        onClick={() => {
          setTimeout(() => {
            setIsContentVisible(prev => !prev);
          }, 500); 
        }}
      >
        Toggle
      </button>
      {isContentVisible ? <div>Content</div> : null}
    </div>
  );
};

// ❗ False positives also occur when not awaiting eventually

describe("❌ false positive when not awaiting waitFor", () => {
  it("toggles content on button click", async () => {
    render(<ToggleContent />);
  
    expect(screen.queryByText("Content")).toBeFalsy();
    
    await userEvent.click(screen.getByRole("button"));
  
    expect(screen.queryByText("Content")).toBeTruthy();
  });

  it("a fix which results in a false positive", async () => {
    render(<ToggleContent />);
  
    expect(screen.queryByText("Content")).toBeFalsy();
    
    await userEvent.click(screen.getByRole("button"));
  
    waitFor(() => {
      expect(screen.queryByText("Content")).toBeTruthy();
    })
  });
});

describe("✅ test detects the bug and fails when awaiting waitFor", () => {
  it("toggles content on button click", async () => {
    render(<ToggleContent />);
  
    expect(screen.queryByText("Content")).toBeFalsy();
    
    await userEvent.click(screen.getByRole("button"));
  
    await waitFor(() => {
      expect(screen.queryByText("Content")).toBeTruthy();
    })
  });
});
