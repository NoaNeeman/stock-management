import React, { createContext, ReactNode, useContext } from 'react';
import RootStore from './rootStore';

interface StoresContextType {
  stockStore: RootStore['stockStore'];
  userPortfolioStore: RootStore['userPortfolioStore'];
  authStore: RootStore['authStore'];
}

export const StoresContext = createContext<StoresContextType | undefined>(
  undefined
);

interface StoresProviderProps {
  children: ReactNode;
}

export const StoresProvider: React.FC<StoresProviderProps> = ({ children }) => {
  const rootStore = new RootStore();

  return (
    <StoresContext.Provider value={rootStore}>
      {children}
    </StoresContext.Provider>
  );
};

// Custom hook to use the stores
export const useStores = (): StoresContextType => {
  const context = useContext(StoresContext);
  if (!context) {
    throw new Error('useStores must be used within a StoresProvider');
  }
  return context;
};
