import { render, act } from "@testing-library/react";
import RenderAct from "./RenderAct";

it("❌ throws act warning when rendering initially open popover", async () => {
  render(<RenderAct />);
});

it("✅ act warning is fixed by wrapping render with async act", async () => {
  await act(async () => {
    render(<RenderAct />);
  });
});
