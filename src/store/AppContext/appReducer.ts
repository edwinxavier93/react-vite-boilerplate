import { type AppAction, type AppState } from "./appState";

export const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
  case "SET_STATE":
    return { ...state, stateValue: action.payload };
  default:
    throw new Error(`Unhandled action type: ${action.type}`);
  }
};