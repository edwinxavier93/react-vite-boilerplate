import { screen } from "@testing-library/dom";
import { render } from "@testing-library/react";
import ErrorBoundary from "../src/components/ErrorBoundary";

describe("ErrorBoundary", () => {
  it("should display fallback UI when a child component throws an error", () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    const error = new Error("Test error");
    const ThrowingComponent = () => {
      throw error;
    };
    render(
      <ErrorBoundary>
        <ThrowingComponent />
      </ErrorBoundary>
    );
    expect(screen.getByText(/Something went wrong/i)).toBeInTheDocument();
    vi.restoreAllMocks();
  });

  it("should render children when no error occurs", () => {
    render(
      <ErrorBoundary>
        <div>All good!</div>
      </ErrorBoundary>
    );
    expect(screen.getByText(/all good/i)).toBeInTheDocument();
  });
});
