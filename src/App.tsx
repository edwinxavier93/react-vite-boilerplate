import { Suspense, lazy } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AboutPage from "./pages/AboutPage";
import WorkListPage from "./pages/workList";
import SideMenu from "./components/sideMenu/SideMenu";
import { menuData } from "./components/sideMenu/menuConfig";

const isAuthenticated = false;

const SuspenseWrapper = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
);

function App() {
  return (
    <section className="flex flex-1">
      <SideMenu menuData={menuData} onMenuClick={() => {}} />
      <main className="flex flex-1">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<WorkListPage />} />
            <Route
              path="/about"
              element={
                isAuthenticated ? (
                  <AboutPage />
                ) : (
                  <Navigate to="/" replace={true} />
                )
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
      </main>
    </section>
  );
}

export default App;
