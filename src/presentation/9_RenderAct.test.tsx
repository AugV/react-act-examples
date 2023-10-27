import React from "react";
import { render } from "@testing-library/react";
import Popper from "../examples/Popper";

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

it("renders open popover", async () => {
  render(<RenderAct />);
});
