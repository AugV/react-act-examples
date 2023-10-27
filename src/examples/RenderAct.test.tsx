import React from "react";
import { render, act } from "@testing-library/react";
import Popper from "./Popper";

const RenderAct = () => {
  const popperRef = React.useRef(null);

  return (
    <div style={{ padding: "50px" }}>
      <button id="test">Toggle popover</button>
      {/* @ts-ignore */}
      <Popper
        initOpen={true}
        ref={popperRef}
        placement="bottom"
        target="test"
        toggle="legacy"
      >
        Popover content
      </Popper>
    </div>
  );
};

it("❌ throws act warning when rendering initially open popover", async () => {
  render(<RenderAct />);
});

it("✅ act warning is fixed by wrapping render with async act", async () => {
  await act(async () => {
    render(<RenderAct />);
  });
});

it("✅ or flushing tasks after render", async () => {
  render(<RenderAct />);
  await act(async () => {});
});
