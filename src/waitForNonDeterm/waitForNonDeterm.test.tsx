import { render, screen, waitFor } from "@testing-library/react";
import { TestComponent } from "./TestComponent";
import userEvent from "@testing-library/user-event";

describe("non-deterministic action and waitFor", () => {
  it("fails - when action is inside waitFor", async () => {
    const user = userEvent.setup();
    render(<TestComponent />);

    await waitFor(async () => {
      await user.tab();
      expect(screen.getByText("Ultimate tooltip")).toBeTruthy();
    });
  });

  it("succeeds - when action is outside waitFor", async () => {
    const user = userEvent.setup();
    render(<TestComponent />);

    await user.tab();
    await waitFor(async () => {
      expect(screen.getByText("Ultimate tooltip")).toBeTruthy();
    });
  });

  it("fails - when action is outside of waitFor but waitFor has sync callback", async () => {
    const user = userEvent.setup();
    render(<TestComponent />);

    await user.tab();
    await waitFor(() => {
      expect(screen.getByText("Ultimate tooltip")).toBeTruthy();
    });
  });

  // NOTE: getBy used inside waitFor for problem illustration purposes, usually in this scenario, you should use findBy instead of waitFor+getBy
});
