import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConfigProvider } from 'antd';
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import ErrorBoundary from "./components/ErrorBoundary";
import { AppProvider } from "./store/AppContext/AppContext.tsx";

import "./index.scss";
import "./tailwind.css";

const COLORS = {
  PRIMARY: "#000",
  SECONDARY: "#1C1B1B",
  GREY: "#525252",
  GREY_LIGHT: "#ffffff50",
  WHITE: "#fff",
  BORDER_LIGHT: "#2D2F39"
}

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
            fontFamily: 'Inter, sans-serif',
            colorPrimary: COLORS.PRIMARY,
            colorSecondary: COLORS.SECONDARY,
            textLight: COLORS.GREY_LIGHT,
            textWhite: COLORS.WHITE,
            borderLight: COLORS.BORDER_LIGHT
          },
          components: {
            Button: {
              borderRadius: 7,
              primaryColor: COLORS.WHITE,
            },
            Menu: {
              itemColor: COLORS.GREY_LIGHT,
              itemBg: COLORS.SECONDARY,
              itemHoverColor: COLORS.WHITE,
              itemHoverBg: COLORS.GREY,
              itemSelectedColor: COLORS.WHITE,
              itemSelectedBg: COLORS.GREY,
              groupTitleColor: COLORS.WHITE,
              groupTitleFontSize: "10px"
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
