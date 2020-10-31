import React from "react";

export interface MobileViewContextValue {
  isDetailView: boolean;
  setIsDetailView: React.Dispatch<boolean>;
}

const MobileViewContext = React.createContext<MobileViewContextValue | undefined>(undefined);

export const MobileViewProvider: React.FC = function (props) {
  const { children } = props;
  const [isDetailView, setIsDetailView] = React.useState<boolean>(false);

  const value = {
    isDetailView,
    setIsDetailView,
  };

  return <MobileViewContext.Provider value={value}>{children}</MobileViewContext.Provider>;
};

export const useMobileViewContext = function () {
  const context = React.useContext(MobileViewContext);
  if (context === undefined) {
    throw new Error("useMobileViewContext must be used within a MobileViewProvider");
  }
  return context;
};
