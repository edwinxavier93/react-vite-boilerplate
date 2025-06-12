import React, { Suspense, lazy } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import SideMenu from "./components/sideMenu/SideMenu";
import { Content } from "antd/es/layout/layout";

const AboutPage = lazy(() => import("./pages/AboutPage"));
const WorkListPage = lazy(() => import("./pages/WorkList"));

const isAuthenticated = false;

const SuspenseWrapper = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
);

function App() {
  return (
    <section className="flex flex-1">
      <SideMenu onMenuClick={() => {}} />
      <Content className="flex flex-1">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<SuspenseWrapper><WorkListPage /></SuspenseWrapper>} />
            <Route
              path="/about"
              element={
                isAuthenticated ? (
                  <SuspenseWrapper><AboutPage /></SuspenseWrapper>
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
      </Content>
    </section>
  );
}

export default App;
