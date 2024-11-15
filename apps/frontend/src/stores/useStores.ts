import { useContext } from 'react';
import { StoresContext } from './storesContext';

// Access the stores from context
export const useStores = () => {
  const context = useContext(StoresContext);
  if (!context) {
    throw new Error('useStores must be used within a StoresProvider');
  }
  return context;
};
