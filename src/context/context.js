import React, { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export const useTheme = () => {
  return useContext(ThemeContext);
};

export const ThemeProvider = ({ children }) => {
  const [isDarkmode, setIsdarkmode] = useState(false);

  const Toggletheme = () => {
    setIsdarkmode((prevState) => !prevState);
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [isDarkmode]);

  const theme = isDarkmode ? "Dark" : "Light";

  return (
    <ThemeContext.Provider value={{ theme, Toggletheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
