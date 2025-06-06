import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import NewApplication from "./NewApplication";
import { ContextProvider } from "../../context/ContextProvider";

describe("NewApplication Integration", () => {
  it("flows from PersonalInfo (step1) → Finances (step2) → Success (step3)", async () => {
    const queryClient = new QueryClient();
    render(
      <BrowserRouter>
        <ContextProvider>
          <QueryClientProvider client={queryClient}>
            <NewApplication />
          </QueryClientProvider>
        </ContextProvider>
      </BrowserRouter>
    );

    const user = userEvent.setup();

    //step1
    const fullNameInput = screen.getByLabelText(/Full Name/i);
    const emailInput = screen.getByLabelText(/Email/i);
    const dateInput = screen.getByLabelText(/Date of Birth/i);

    await user.clear(fullNameInput);
    await user.type(fullNameInput, "John Doe");

    await user.clear(emailInput);
    await user.type(emailInput, "john@example.com");

    await user.clear(dateInput);
    await user.type(dateInput, "01-01-1990");

    await userEvent.click(screen.getByRole("button", { name: /Continue/i }));

    //step2
    const incomeInput = screen.getByLabelText(/Income/i);
    const fullTimeRadio = screen.getByLabelText(/Full time/i);
    const acceptTermsCheckbox = screen.getByLabelText(
      /I accept the terms and conditions/i
    );

    await user.clear(incomeInput);
    await user.type(incomeInput, "50000");
    expect(incomeInput).toHaveValue("50000");

    await user.click(fullTimeRadio);
    expect(fullTimeRadio).toBeChecked();

    await user.click(acceptTermsCheckbox);
    expect(acceptTermsCheckbox).toBeChecked();

    await userEvent.click(screen.getByRole("button", { name: /Submit/i }));

    //step3
    expect(await screen.findByText(/Congratulations/i)).toBeInTheDocument();
  });
});
