import React, { createContext, useContext, useEffect, useState } from "react";

export const LogContext = createContext();

const LogContextProvider = ({ children }) => {
  const [theme, settheme] = useState({ dark: false });
  useEffect(() => {
    console.log(theme.dark);
    return () => {};
  }, [theme]);

  function updateTheme() {
    settheme((prevState) => {
      return { dark: !prevState.dark };
    });
    // if(theme.dark == true){
    //   document.querySelector('body').classList.add('bg_dark')
    // }else{
    //   document.querySelector('body').classList.remove('bg_dark')
    // }
  }
  let state = {
    theme,
    updateTheme,
  };
  return (
    <LogContext.Provider
      value={state}
     
    >
      <main  className={` ${theme?.dark ? "bg_dark" : ""}`}>

      {children}
      </main>
    </LogContext.Provider>
  );
};

export default LogContextProvider;

export function useLogContaxt() {
  return useContext(LogContext);
}
