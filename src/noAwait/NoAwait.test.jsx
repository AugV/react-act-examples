import { userEvent } from "@testing-library/user-event";
import { render, screen, waitFor } from "@testing-library/react";
import NoAwait from "./NoAwait";

it("❌ false positive when not awaiting waitFor", async () => {
  render(<NoAwait />);

  await userEvent.click(screen.getByRole("button"));

  await waitFor(() => {
    expect(screen.getByText("Content")).toBeTruthy();
  });

  await userEvent.click(screen.getByRole("button"));

  waitFor(() => {
    expect(screen.getByText("Content")).toBeFalsy();
  });
});

it("✅ test detects the bug and fails when awaiting waitFor", async () => {
  render(<NoAwait />);

  await userEvent.click(screen.getByRole("button"));

  await waitFor(() => {
    expect(screen.getByText("Content")).toBeTruthy();
  });

  await userEvent.click(screen.getByRole("button"));

  await waitFor(() => {
    expect(screen.getByText("Content")).toBeFalsy();
  });
});
