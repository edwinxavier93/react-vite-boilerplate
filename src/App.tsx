import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AboutPage from "./pages/AboutPage";
import Form from "./pages/Form";
import HomePage from "./pages/HomePage";

const isAuthenticated = false;

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/form" element={<Form />} />
        <Route
          path="/about"
          element={
            isAuthenticated ? <AboutPage /> : <Navigate to="/" replace={true} />
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
