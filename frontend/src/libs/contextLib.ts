import { createContext, useContext, Dispatch, SetStateAction } from 'react';

interface AppState {
  isAuthenticated: boolean;
  setAuthentication: Dispatch<SetStateAction<boolean>>;
}

export const AppContext = createContext<AppState>({
  isAuthenticated: false,
  setAuthentication: () => {},
});
export const useAppContext = () => useContext(AppContext);
