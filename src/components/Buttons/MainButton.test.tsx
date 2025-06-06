import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, vi, expect } from "vitest";
import MainButton from "./MainButton";

describe("MainButton", () => {
  it("renders button text correctly", () => {
    render(
      <MainButton
        buttonText="Click Me"
        buttonType="button"
        isDisabledButton={false}
      />
    );
    expect(screen.getByRole("button")).toHaveTextContent("Click Me");
  });

  it("disables the button when isDisabledButton is true", () => {
    render(
      <MainButton
        buttonText="Disabled"
        buttonType="button"
        isDisabledButton={true}
      />
    );
    expect(screen.getByRole("button")).toBeDisabled();
    expect(screen.getByRole("button")).toHaveStyle("opacity: 0.5");
  });

  it("calls buttonAction when clicked", () => {
    const handleClick = vi.fn();
    render(
      <MainButton
        buttonText="Click"
        buttonType="button"
        isDisabledButton={false}
        buttonAction={handleClick}
      />
    );
    fireEvent.click(screen.getByRole("button"));
    expect(handleClick).toHaveBeenCalled();
  });

  it("does not call buttonAction when disabled", () => {
    const handleClick = vi.fn();
    render(
      <MainButton
        buttonText="Can't click"
        buttonType="button"
        isDisabledButton={true}
        buttonAction={handleClick}
      />
    );
    fireEvent.click(screen.getByRole("button"));
    expect(handleClick).not.toHaveBeenCalled();
  });
});
