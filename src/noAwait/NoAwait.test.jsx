import { userEvent } from "@testing-library/user-event";
import { render, screen, waitFor } from "@testing-library/react";
import NoAwait from "./NoAwait";

// ❗ False positives also occur when not awaiting eventually

describe("❌ false positive when not awaiting waitFor", () => {
  it("toggles content on button click", async () => {
    render(<NoAwait />);

    await userEvent.click(screen.getByRole("button"));

    await waitFor(() => {
      expect(screen.getByText("Content")).toBeTruthy();
    });

    await userEvent.click(screen.getByRole("button"));

    waitFor(() => {
      expect(screen.queryByText("Content")).toBeFalsy();
    });
  });
});

describe("✅ test detects the bug and fails when awaiting waitFor", () => {
  it("toggles content on button click", async () => {
    render(<NoAwait />);

    await userEvent.click(screen.getByRole("button"));

    await waitFor(() => {
      expect(screen.getByText("Content")).toBeTruthy();
    });

    await userEvent.click(screen.getByRole("button"));

    await waitFor(async () => {
      expect(screen.queryByText("Content")).toBeFalsy();
    });
  });
});
