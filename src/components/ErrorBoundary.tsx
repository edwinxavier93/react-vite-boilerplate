import type { ReactNode } from "react";
import {
  ErrorBoundary as ReactErrorBoundary,
  useErrorBoundary,
} from "react-error-boundary";

type ErrorBoundaryProps = {
  children: ReactNode;
};

function ErrorFallback() {
  const { resetBoundary } = useErrorBoundary();
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1>Something went wrong.</h1>
      <button onClick={resetBoundary}>Reset</button>
    </div>
  );
}

function ErrorBoundary({ children }: ErrorBoundaryProps) {
  return (
    <ReactErrorBoundary FallbackComponent={ErrorFallback}>
      {children}
    </ReactErrorBoundary>
  );
}

export default ErrorBoundary;
