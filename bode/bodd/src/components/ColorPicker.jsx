// src/components/ColorPicker.jsx
import React from "react";
import { useColor } from "../context/ColorContext";

const colorOptions = [
  { name: "Rosa", value: "pink", bg: "#ec4899" },
  { name: "Cyan", value: "cyan", bg: "#06b6d4" },
  { name: "Verde", value: "green", bg: "#22c55e" },
  { name: "Azul", value: "blue", bg: "#3b82f6" },
  { name: "Rojo", value: "red", bg: "#ef4444" },
  { name: "Indigo", value: "indigo", bg: "#6366f1" },
  { name: "Gris", value: "gray", bg: "#808080" },
  { name: "Naranja", value: "orange", bg: "#f97316" },
  { name: "Morado", value: "purple", bg: "#8b5cf6" },
  { name: "Amber", value: "amber", bg: "#f59e0b" },
  { name: "Emeralda", value: "emerald", bg: "#10b981" },
  { name: "Fuchsia", value: "fuchsia", bg: "#d946ef" },
  { name: "Cafe", value: "brown", bg: "#a18262" },
];

const ColorPicker = () => {
  const { color, changeColor } = useColor();

  return (
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn custom-bg m-1">
        Tema
        <svg
          width="12px"
          height="12px"
          className="inline-block h-2 w-2 fill-current opacity-60 ml-1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 2048 2048"
        >
          <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z" />
        </svg>
      </div>

      <ul
        tabIndex={0}
        className="dropdown-content bg-base-300 rounded-box z-10 w-52 p-2 shadow-2xl max-h-96 overflow-y-auto"
      >
        {colorOptions.map((c) => (
          <li key={c.value}>
            <label className="btn btn-sm btn-block btn-ghost justify-start gap-2 cursor-pointer">
              <input
                type="radio"
                name="theme-dropdown"
                value={c.value}
                checked={color === c.value}
                onChange={() => changeColor(c.value)}
                className="hidden"
              />
              <span
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: c.bg }}
              ></span>
              {c.name}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ColorPicker;
