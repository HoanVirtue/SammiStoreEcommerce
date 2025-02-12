import { createContext, useContext, useState } from "react";

const GlobalContext = createContext();

function GlobalContextProvider({ children }) {
  const GlobalContextData = {};

  return (
    <GlobalContext.Provider value={GlobalContextData}>
      {children}
    </GlobalContext.Provider>
  );
}

export default GlobalContextProvider;
export function useGlobalContext() {
  return useContext(GlobalContext);
}
