import React, {
  createContext,
  useContext,
  useReducer,
  type ReactNode,
} from "react";

type AppState = {
  stateValue: string;
};

type AppAction = {
  type: "SET_STATE";
  payload: string;
};

type AppContextType = {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
};

const initialState: AppState = {
  stateValue: "default value",
};

const AppContext = createContext<AppContextType | undefined>(undefined);

const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
  case "SET_STATE":
    return { ...state, stateValue: action.payload };
  default:
    throw new Error(`Unhandled action type: ${action.type}`);
  }
};

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
