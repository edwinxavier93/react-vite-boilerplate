import { Suspense, lazy } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

const HomePage = lazy(() => import("./pages/HomePage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));

const isAuthenticated = false;

const SuspenseWrapper = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<div>Loading...</div>}>
    {children}
  </Suspense>
);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <SuspenseWrapper><HomePage /></SuspenseWrapper>
        } />
        <Route
          path="/about"
          element={
            isAuthenticated ?
              <SuspenseWrapper><AboutPage /></SuspenseWrapper> :
              <Navigate to="/" replace={true} />
          }
        />
        <Route
          path="*"
          element={
            <div className="flex flex-col items-center justify-center h-screen">
              <h1>404 Not Found</h1>
              <p>The page you are looking for does not exist.</p>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
