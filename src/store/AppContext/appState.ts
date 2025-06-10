export type AppState = {
  stateValue: string;
};

export type AppAction = {
  type: "SET_STATE";
  payload: string;
};

export type AppContextType = {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
};

export const initialState: AppState = {
  stateValue: "default value",
};