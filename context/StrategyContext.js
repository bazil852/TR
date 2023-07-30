import React, { createContext, useContext, useState } from 'react';

// Create a new context
const StrategyContext = createContext();

// Create a provider component
export const StrategyProvider = ({ children }) => {
  const [GeneralSettingsData, setGeneralSettingsData] = useState([
    {
      strategyName: "",
      strategyFolder: "",
      strategyDescription: "",
      botLink: "",
      notes: "",
    },
  ]);
  const [OrdersData, setOrdersData] = useState([
    {
      firstOrderSize: "",
      extraOrderSize: "",
      orderType: "",
      pairs: "",
    },
  ]);
  const [DCAData, setDCAData] = useState([
    {
      dcaType: "",
      volumeMultiplier: "",
      maxExtraOrders: "",
      minDistBetweenOrders: "",
      startExtraOrder: "",
      stepMultiplier: "",
    },
  ]);
  const [TakeProfitData, setTakeProfitData] = useState([
    {
      takeProfit: "",
      minTakeProfit: "",
    },
  ]);
  const [StopLossData, setStopLossData] = useState([
    {
      stopLoss: "",
    },
  ]);
  const [ParametersData, setParametersData] = useState([
    [
      {
        1: "",
        operation: "",
        2: "",
        relation: "",
        middleOne: "",
        middleTwo: "",
      },
    ],
  ]);

  // ... do this for all your state

  const value = {
    GeneralSettingsData,
    setGeneralSettingsData,
    OrdersData,
    setOrdersData,
    DCAData, 
    setDCAData,
    TakeProfitData, 
    setTakeProfitData,
    StopLossData, 
    setStopLossData,
    ParametersData,
    setParametersData
    // ... do this for all your state
  };

  return (
    <StrategyContext.Provider value={value}>
      {children}
    </StrategyContext.Provider>
  );
}

// Create a hook to use the context
export const useStrategy = () => {
  const context = useContext(StrategyContext);
  if (context === undefined) {
    throw new Error('useStrategy must be used within a StrategyProvider');
  }
  return context;
}
