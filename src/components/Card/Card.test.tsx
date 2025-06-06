import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, vi, beforeEach, expect } from "vitest";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Card from "./Card";
import * as ReactQuery from "@tanstack/react-query";
import type { ApplicationType } from "../../types/Application";
import { ContextProvider } from "../../context/ContextProvider";

// Mock react-toastify
vi.mock("react-toastify", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

const mockDeleteApp = vi.fn();

// Mock useMutation globally
vi.mock("@tanstack/react-query", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@tanstack/react-query")>();
  return {
    ...actual,
    useMutation: vi.fn(),
  };
});

const mockApplication: ApplicationType = {
  id: 1,
  email: "test@example.com",
  employmentType: "full-time",
  income: "42000",
  fullName: "Joe Smith",
  date: "10-10-2010",
};

const renderWithClient = (ui: React.ReactElement) => {
  const queryClient = new QueryClient();
  return render(
    <ContextProvider>
      <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>
    </ContextProvider>
  );
};

describe("Card Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders application details", () => {
    (
      ReactQuery.useMutation as unknown as ReturnType<typeof vi.fn>
    ).mockReturnValue({
      mutate: mockDeleteApp,
      isPending: false,
    });

    renderWithClient(<Card application={mockApplication} />);
    expect(screen.getByText("test@example.com")).toBeInTheDocument();
    expect(screen.getByText("full-time")).toBeInTheDocument();
    expect(screen.getByText("42000 €")).toBeInTheDocument();
  });

  it("calls deleteApplication when trash icon is clicked", async () => {
    const mutateFn = vi.fn();
    (
      ReactQuery.useMutation as unknown as ReturnType<typeof vi.fn>
    ).mockReturnValue({
      mutate: mutateFn,
      isPending: false,
    });

    renderWithClient(<Card application={mockApplication} />);
    const trashButton = screen.getByTestId("trash-icon");
    fireEvent.click(trashButton);

    await waitFor(() => {
      expect(mutateFn).toHaveBeenCalledWith(mockApplication.id);
    });
  });

  it("shows loader when isPending is true", () => {
    (
      ReactQuery.useMutation as unknown as ReturnType<typeof vi.fn>
    ).mockReturnValue({
      mutate: mockDeleteApp,
      isPending: true,
    });

    renderWithClient(<Card application={mockApplication} />);
    expect(screen.getByTestId("loader")).toBeInTheDocument();
  });
});
