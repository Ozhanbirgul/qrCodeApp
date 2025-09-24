import React, { createContext, useState, useContext, useEffect } from "react";

// Context oluştur
const ThemeContext = createContext();

// Provider bileşeni
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");

  // Temayı toggle etme fonksiyonu
  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  // İsteğe bağlı: localStorage ile kullanıcı tercihini sakla
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) setTheme(savedTheme);
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", theme);
    // Body class ekle/çıkar
    document.body.className = theme;
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook ile kullanımı kolaylaştır
export const useTheme = () => useContext(ThemeContext);
