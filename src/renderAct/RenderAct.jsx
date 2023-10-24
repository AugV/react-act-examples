import React from "react";
import Popper from "./Popper";

const RenderAct = () => {
  const popperRef = React.useRef(null);

  return (
    <div style={{ padding: "50px" }}>
      <button id="test">Toggle popover</button>
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

export default RenderAct;
