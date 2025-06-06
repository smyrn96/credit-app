import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, type Mock } from "vitest";
import userEvent from "@testing-library/user-event";
import Applications from "./Applications";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import type { ApplicationType } from "../../types/Application";

// Mock useQuery
vi.mock("@tanstack/react-query", async () => {
  const actual = await vi.importActual("@tanstack/react-query");
  return {
    ...actual,
    useQuery: vi.fn(),
  };
});

// Mock useNavigate
const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

// Setup helper
const mockUseQuery = ({
  isLoading = false,
  data = [] as ApplicationType[],
}) => {
  (useQuery as unknown as Mock).mockReturnValue({
    isLoading,
    data,
  });
};

// Helper wrapper with Router
const renderWithRouter = (ui: React.ReactNode) =>
  render(<BrowserRouter>{ui}</BrowserRouter>);

// Tests
describe("Applications Page", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("shows loader when loading", () => {
    mockUseQuery({ isLoading: true });
    renderWithRouter(<Applications />);
    expect(screen.getByTestId("loader")).toBeInTheDocument();
  });

  it("renders application cards", () => {
    mockUseQuery({
      data: [
        {
          id: 1,
          fullName: "John Doe",
          email: "manos@gmail.com",
          date: "01-01-1990",
          employmentType: "full-time",
          income: "40000",
        },
        {
          id: 2,
          fullName: "John Doe",
          email: "manos@gmail.com",
          date: "01-01-1990",
          employmentType: "full-time",
          income: "40000",
        },
      ],
    });
    const queryClient = new QueryClient();

    renderWithRouter(
      <QueryClientProvider client={queryClient}>
        <Applications />
      </QueryClientProvider>
    );

    // Update Card component to include data-testid="application-card"
    const cards = screen.getAllByTestId("application-card");
    expect(cards).toHaveLength(2);
  });

  it("navigates to new application on button click", async () => {
    mockUseQuery({ data: [] });
    renderWithRouter(<Applications />);
    const button = screen.getByRole("button", { name: /Apply Again/i });
    await userEvent.click(button);
    expect(mockNavigate).toHaveBeenCalledWith("/applications/new");
  });
});
