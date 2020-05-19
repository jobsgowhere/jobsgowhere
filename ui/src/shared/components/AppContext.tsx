import * as React from "react";

type ContextProps = {
  isDetailScreen?: boolean;
  setIsDetailScreen?: React.Dispatch<boolean>;
};

const AppContext = React.createContext<ContextProps>({});

export const AppContextProvider: React.FC = function ({ children }) {
  const [isDetailScreen, setIsDetailScreen] = React.useState(false);
  return (
    <AppContext.Provider value={{ isDetailScreen, setIsDetailScreen }}>
      {children}
    </AppContext.Provider>
  );
};

export function useAppContext() {
  const value = React.useContext(AppContext);
  return value;
}
