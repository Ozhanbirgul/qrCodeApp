import React from "react";
import { useTheme } from "../context/ThemeContext";
import { Button } from "@mui/material";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button variant="outlined" onClick={toggleTheme}>
      {theme === "light" ? "Karanlık Mod" : "Aydınlık Mod"}
    </Button>
  );
};

export default ThemeToggle;
