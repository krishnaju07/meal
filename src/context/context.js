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

  const theme = isDarkmode ? "Dark" : "Light";

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [isDarkmode, theme]);

  return (
    <ThemeContext.Provider value={{ theme, Toggletheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
