import React, { createContext, useContext, useState } from 'react';

// Create a context
const WheelContext = createContext();

// Create a provider component
export const WheelProvider = ({ children }) => {
  const [gameConditionData, setGameConditionData] = useState(null);
  const [updateWheelState, setUpdateWheelState] = useState({}); // Initial state

  return (
    <WheelContext.Provider value={{ gameConditionData, setGameConditionData ,updateWheelState, setUpdateWheelState }}>
      {children}
    </WheelContext.Provider>
  );
};

// Custom hook to use the context
export const useWheelContext = () => useContext(WheelContext);
