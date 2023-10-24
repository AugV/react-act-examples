import { useState } from "react";

export const TestComponent = () => {
  const [showTooltip, setShowTooltip] = useState(false);
  return (
    <>
      <button
        onFocus={() => setTimeout(() => setShowTooltip(true), 1000)}
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
