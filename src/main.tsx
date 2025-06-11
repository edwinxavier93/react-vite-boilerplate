import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConfigProvider } from 'antd';
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import ErrorBoundary from "./components/ErrorBoundary";
import { AppProvider } from "./store/AppContext/AppContext.tsx";

import "./index.scss";
import "./tailwind.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5,
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <ConfigProvider theme={{
          token: {
            colorPrimary: '#000'
          },
          components: {
            Button: {
              borderRadius: 7,
              primaryColor: '#FFF',
            }
          }
        }}>
          <ErrorBoundary>
            <App />
          </ErrorBoundary>
        </ConfigProvider>
      </AppProvider>
    </QueryClientProvider>
  </StrictMode>
);
