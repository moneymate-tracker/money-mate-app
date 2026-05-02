import React, { createContext, useState, useContext } from 'react';
import { useColorScheme } from 'react-native';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const systemColorScheme = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(systemColorScheme === 'dark');

  const toggleDarkMode = (value) => {
    if (value !== undefined) {
      setIsDarkMode(value);
    } else {
      setIsDarkMode(!isDarkMode);
    }
  };

  const colors = {
    primary: {
      50: '#f0effe',
      100: '#e4e1fd',
      200: '#ccc6fb',
      300: '#a99bf8',
      400: '#8266f3',
      500: '#6C63FF',
      600: '#5a4be0',
      700: '#4c3dc4',
      800: '#3f33a0',
      900: '#362d80',
    },
    dark: {
      900: '#0f0f1a',
      800: '#1a1a2e',
      700: '#16213e',
      600: '#0f3460',
    },
    white: '#ffffff',
    black: '#000000',
    gray: {
      100: '#f3f4f6',
      200: '#e5e7eb',
      300: '#d1d5db',
      400: '#9ca3af',
      500: '#6b7280',
      600: '#4b5563',
      800: '#1f2937',
    }
  };

  const theme = {
    isDarkMode,
    toggleDarkMode,
    colors,
    background: isDarkMode ? colors.dark[900] : colors.primary[50],
    card: isDarkMode ? colors.dark[800] : colors.white,
    text: isDarkMode ? colors.white : colors.dark[900],
    textMuted: isDarkMode ? colors.gray[400] : colors.gray[500],
    border: isDarkMode ? colors.dark[700] : colors.primary[100],
    primaryText: isDarkMode ? colors.primary[300] : colors.primary[600],
    iconBg: isDarkMode ? colors.dark[700] : colors.primary[50],
  };

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
