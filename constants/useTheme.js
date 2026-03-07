import React, { createContext, useContext, useState, useCallback } from "react";
import { DARK_COLORS, LIGHT_COLORS } from "./colors";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleTheme = useCallback(() => {
    setIsDarkMode(prev => !prev);
  }, []);

  const colors = isDarkMode ? DARK_COLORS : LIGHT_COLORS;

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme, colors }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    // Fallback for components rendered outside ThemeProvider
    return { isDarkMode: true, toggleTheme: () => {}, colors: DARK_COLORS };
  }
  return context;
}