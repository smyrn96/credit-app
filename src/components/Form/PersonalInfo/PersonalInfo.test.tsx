import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import PersonalInfo from "./PersonalInfo";
import { ContextProvider } from "../../../context/ContextProvider";

describe("PersonalInfo", () => {
  const mockButtonAction = vi.fn();

  const renderWithContext = () =>
    render(
      <ContextProvider>
        <PersonalInfo buttonText="Continue" buttonAction={mockButtonAction} />
      </ContextProvider>
    );

  it("renders all fields and the button", () => {
    renderWithContext();

    expect(screen.getByLabelText(/Full Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Date of Birth/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Continue/i })
    ).toBeInTheDocument();
  });

  it("allows typing into inputs", async () => {
    renderWithContext();

    const user = userEvent.setup();

    const fullNameInput = screen.getByLabelText(/Full Name/i);
    const emailInput = screen.getByLabelText(/Email/i);
    const dateInput = screen.getByLabelText(/Date of Birth/i);

    await user.clear(fullNameInput);
    await user.type(fullNameInput, "John Doe");

    await user.clear(emailInput);
    await user.type(emailInput, "john@example.com");

    await user.clear(dateInput);
    await user.type(dateInput, "01-01-1990");

    expect(fullNameInput).toHaveValue("John Doe");
    expect(emailInput).toHaveValue("john@example.com");
    expect(dateInput).toHaveValue("01-01-1990");
  });

  it("calls buttonAction on submit", async () => {
    renderWithContext();

    const user = userEvent.setup();

    await user.type(screen.getByLabelText(/Full Name/i), "Jane Smith");
    await user.type(screen.getByLabelText(/Email/i), "jane@mail.com");
    await user.type(screen.getByLabelText(/Date of Birth/i), "30-10-2000");

    const button = screen.getByRole("button", { name: /Continue/i });

    await user.click(button);

    expect(mockButtonAction).toHaveBeenCalledTimes(1);
  });
});
