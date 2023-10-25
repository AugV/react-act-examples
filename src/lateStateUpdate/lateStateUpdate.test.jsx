import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { useState } from "react";

function NewsletterForm({ updateNewsletter }) {
  const [signedUp, setSignedUp] = useState(false);
  const [email, setEmail] = useState("");

  const header = signedUp ? "You're signed up!" : "Sign up for our newsletter!";

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateNewsletter(email);
    setSignedUp(true);
  };

  return (
    <form onSubmit={handleSubmit} className="newsletter">
      <span>{header}</span>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button type="submit">Sign up</button>
    </form>
  );
}

describe("Late state update causes act warning", () => {
  const updateNewsletter = jest.fn();
  const email = "bob.bobberson@gmail.com";
  let emailInput, submitButton;
  
  beforeEach(() => {
    jest.clearAllMocks();
    render(<NewsletterForm updateNewsletter={updateNewsletter} />);
  
    emailInput = screen.getByRole("textbox");
    submitButton = screen.getByRole("button");
  });

  it("❌ - because the state updates don't settle soon enough", async () => {  
    fireEvent.change(emailInput, { target: { value: email } });
    fireEvent.click(submitButton);
  
    expect(updateNewsletter).toHaveBeenCalledWith(email);
  });
  
  it("❌ - sync act", async () => {
    act(() => {
      fireEvent.change(emailInput, { target: { value: email } });
      fireEvent.click(submitButton);
    });
  
    expect(updateNewsletter).toHaveBeenCalledWith(email);
  });
  
  it("✅ - async act", async () => {
    await act(async () => {
      fireEvent.change(emailInput, { target: { value: email } });
      fireEvent.click(submitButton);
    });
  
    expect(updateNewsletter).toHaveBeenCalledWith(email);
  });
  
  it("✅ - waitFor", async () => {
    fireEvent.change(emailInput, { target: { value: email } });
    fireEvent.click(submitButton);
  
    await waitFor(() => {
      expect(updateNewsletter).toHaveBeenCalledWith(email);
    });
  });
  
  it("✅ - wait to settle explicitly", async () => {
    fireEvent.change(emailInput, { target: { value: email } });
    fireEvent.click(submitButton);
  
    expect(updateNewsletter).toHaveBeenCalledWith(email);
    await waitForElementToBeRemoved(() =>
      screen.queryByText("Sign up for our newsletter!")
    );
  });
  
});

