import React, { createContext, useContext, useState } from 'react';

export const ThemeContext = createContext({
  theme: 'light-theme',
  toggleTheme: () => {},
});

export function useTheme() {
  return useContext(ThemeContext);
}

export default function ThemeContextProvider({ children }) {
  const [theme, setTheme] = useState('light-theme');

  function toggleTheme(){
    setTheme((prevTheme) =>
      prevTheme === 'light-theme' ? 'dark-theme' : 'light-theme'
    );
  }

  return (
    <ThemeContext.Provider value={{theme, toggleTheme}}>
      {children}
    </ThemeContext.Provider>
  );
}
