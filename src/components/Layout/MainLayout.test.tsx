import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, vi, expect } from "vitest";
import MainLayout from "./MainLayout";

const TestChild = () => <div data-testid="child">Child content</div>;

describe("MainLayout", () => {
  it("renders header and child content", () => {
    render(
      <MainLayout
        headerText="Test Header"
        buttonText="Click Me"
        isDisabledButton={false}
        buttonAction={() => {}}
      >
        <TestChild />
      </MainLayout>
    );

    expect(screen.getByText("Test Header")).toBeInTheDocument();
    expect(screen.getByTestId("child")).toBeInTheDocument();
  });

  it("calls buttonAction on button click", () => {
    const mockClick = vi.fn();

    render(
      <MainLayout
        headerText="Header"
        buttonText="Click Me"
        isDisabledButton={false}
        buttonAction={mockClick}
      >
        <div />
      </MainLayout>
    );

    fireEvent.click(screen.getByRole("button", { name: "Click Me" }));
    expect(mockClick).toHaveBeenCalled();
  });

  it("renders Icon and calls iconAction when clicked", () => {
    const mockIconClick = vi.fn();

    const DummyIcon = () => <svg data-testid="dummy-icon" />;

    render(
      <MainLayout
        headerText="Header"
        buttonText="Test"
        isDisabledButton={false}
        Icon={DummyIcon as unknown as string}
        iconAction={mockIconClick}
        buttonAction={() => {}}
      >
        <div />
      </MainLayout>
    );

    const iconButton = screen.getByTestId("icon-button");
    fireEvent.click(iconButton);
    expect(mockIconClick).toHaveBeenCalled();
    expect(screen.getByTestId("dummy-icon")).toBeInTheDocument();
  });

  it("does not render button if buttonAction is not provided", () => {
    render(
      <MainLayout
        headerText="Header"
        buttonText="Click Me"
        isDisabledButton={false}
      >
        <div />
      </MainLayout>
    );

    expect(
      screen.queryByRole("button", { name: "Click Me" })
    ).not.toBeInTheDocument();
  });

  it("does not render header if headerText is empty", () => {
    render(
      <MainLayout
        headerText=""
        buttonText="Test"
        isDisabledButton={false}
        buttonAction={() => {}}
      >
        <div />
      </MainLayout>
    );

    expect(screen.queryByRole("heading", { level: 2 })).not.toBeInTheDocument();
  });
});
