import React, { createContext, useContext, useEffect, useState } from "react";

export const LogContext = createContext();

const LogContextProvider = ({ children }) => {
  const [loggedUser, setloggedUser] = useState();
  useEffect(() => {
    // console.log(theme.dark);
    return () => {};
  }, [loggedUser]);

  function updateLoggedUser(data) {
    setloggedUser(data);
  }
  let state = {
    loggedUser,
    updateLoggedUser,
  };
  return <LogContext.Provider value={state}>{children}</LogContext.Provider>;
};

export default LogContextProvider;

export function useLogContaxt() {
  return useContext(LogContext);
}
