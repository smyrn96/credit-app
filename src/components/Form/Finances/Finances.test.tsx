import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import Finances from "./Finances";
import { ContextProvider } from "../../../context/ContextProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

describe("Finances", () => {
  const mockButtonAction = vi.fn();

  const renderWithContext = () =>
    render(
      <ContextProvider>
        <QueryClientProvider client={queryClient}>
          <Finances buttonText="Submit" buttonAction={mockButtonAction} />
        </QueryClientProvider>
      </ContextProvider>
    );

  it("renders all fields and the button", () => {
    renderWithContext();

    expect(screen.getByLabelText(/Income/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Full time/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Full time/i)).toHaveAttribute(
      "type",
      "radio"
    );
    expect(screen.getByLabelText(/Part time/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Unemployed/i)).toHaveAttribute(
      "type",
      "radio"
    );
    expect(
      screen.getByLabelText(/I accept the terms and conditions/i)
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Submit/i })).toBeInTheDocument();
  });

  it("allows typing into inputs", async () => {
    renderWithContext();

    const user = userEvent.setup();

    const incomeInput = screen.getByLabelText(/Income/i);
    const fullTimeRadio = screen.getByLabelText(/Full time/i);
    const partTimeRadio = screen.getByLabelText(/Part time/i);
    const unemployedRadio = screen.getByLabelText(/Unemployed/i);
    const acceptTermsCheckbox = screen.getByLabelText(
      /I accept the terms and conditions/i
    );

    await user.clear(incomeInput);
    await user.type(incomeInput, "50000");
    expect(incomeInput).toHaveValue("50000");

    await user.click(fullTimeRadio);
    expect(fullTimeRadio).toBeChecked();

    await user.click(partTimeRadio);
    expect(partTimeRadio).toBeChecked();

    await user.click(unemployedRadio);
    expect(unemployedRadio).toBeChecked();

    await user.click(acceptTermsCheckbox);
    expect(acceptTermsCheckbox).toBeChecked();
  });

  it("calls buttonAction on submit", async () => {
    renderWithContext();

    const user = userEvent.setup();

    const incomeInput = screen.getByLabelText(/Income/i);
    const fullTimeRadio = screen.getByLabelText(/Full time/i);
    const partTimeRadio = screen.getByLabelText(/Part time/i);
    const unemployedRadio = screen.getByLabelText(/Unemployed/i);
    const acceptTermsCheckbox = screen.getByLabelText(
      /I accept the terms and conditions/i
    );

    await user.clear(incomeInput);
    await user.type(incomeInput, "50000");
    expect(incomeInput).toHaveValue("50000");

    await user.click(fullTimeRadio);
    expect(fullTimeRadio).toBeChecked();

    await user.click(partTimeRadio);
    expect(partTimeRadio).toBeChecked();

    await user.click(unemployedRadio);
    expect(unemployedRadio).toBeChecked();

    await user.click(acceptTermsCheckbox);
    expect(acceptTermsCheckbox).toBeChecked();

    await user.click(screen.getByRole("button", { name: /Submit/i }));

    await waitFor(() => {
      expect(mockButtonAction).toHaveBeenCalledTimes(1);
    });
  });
});
