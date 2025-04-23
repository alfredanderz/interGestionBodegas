import React, { createContext, useState, useContext, useEffect } from "react";

const ColorContext = createContext();

export const green = "#22c55e";
export const red = "#ef4444";
export const purple = "#8b5cf6";
export const pink = "#ec4899";
export const yellow = "#eab308";
export const teal = "#14b8a6";
export const indigo = "#6366f1";
export const gray = "#6b7280";
export const cyan = "#06b6d4";
export const lime = "#84cc16";
export const amber = "#f59e0b";
export const emerald = "#10b981";
export const fuchsia = "#d946ef";
export const blue = "#3b82f6";
export const orange = "#f97316";

export const ColorProvider = ({ children }) => {
  const [color, setColor] = useState(() => {
    const stored = localStorage.getItem("theme-color");
    return stored || "orange";
  });

  useEffect(() => {
    let cssColor;
    switch (color) {
      case "green":
        cssColor = green;
        break;
      case "red":
        cssColor = red;
        break;
      case "purple":
        cssColor = purple;
        break;
      case "pink":
        cssColor = pink;
        break;
      case "yellow":
        cssColor = yellow;
        break;
      case "teal":
        cssColor = teal;
        break;
      case "indigo":
        cssColor = indigo;
        break;
      case "gray":
        cssColor = gray;
        break;
      case "cyan":
        cssColor = cyan;
        break;
      case "lime":
        cssColor = lime;
        break;
      case "amber":
        cssColor = amber;
        break;
      case "emerald":
        cssColor = emerald;
        break;
      case "fuchsia":
        cssColor = fuchsia;
        break;
      case "blue":
        cssColor = blue;
        break;
      case "orange":
        cssColor = orange;
        break;
      default:
        cssColor = orange;
    }

    document.documentElement.style.setProperty("--custom-color", cssColor);
    localStorage.setItem("theme-color", color);
  }, [color]);

  const changeColor = (newColor) => {
    setColor(newColor);
  };

  return (
    <ColorContext.Provider value={{ color, changeColor }}>
      {children}
    </ColorContext.Provider>
  );
};

export const useColor = () => useContext(ColorContext);
