import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ColorPicker from "../ColorPicker";

export default function Navbar() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const token = localStorage.getItem("token");
  const user = token ? JSON.parse(localStorage.getItem("user") || "{}") : null;
  const rol = user?.role || null;
  const theme = localStorage.getItem("theme-color") || "#FF7700";

  const handleLogout = () => {
    localStorage.clear();
    localStorage.setItem("theme-color", theme);
    navigate("/login");
  };

  const goToDashboardSuper = () => navigate("/admin/");
  const goToDashboardAdmin = () => navigate("/sedes/");
  const goToRentar = () => navigate("/renta/sedes");
  const goToLogin = () => navigate("/login");
  const goToRegister = () => navigate("/register");

  const renderAuthButtons = () => {
    if (!token) {
      return (
        <>
          <button onClick={goToLogin} className="btn">
            Iniciar sesión
          </button>
          <button onClick={goToRegister} className="btn custom-bg">
            Registrarse
          </button>
        </>
      );
    }

    return (
      <>
        {rol === "SUPERADMINISTRADOR" && (
          <button
            onClick={goToDashboardSuper}
            className="btn btn-outline btn-primary"
          >
            Dashboard
          </button>
        )}
        {rol === "ADMINISTRADOR" && (
          <button
            onClick={goToDashboardAdmin}
            className="btn btn-outline btn-primary"
          >
            Dashboard
          </button>
        )}
        {rol === "CLIENTE" && (
          <button onClick={goToRentar} className="btn btn-outline btn-success">
            Rentar
          </button>
        )}
        <button onClick={handleLogout} className="btn btn-outline btn-error">
          Cerrar sesión
        </button>
      </>
    );
  };

  return (
    <div className="fixed top-0 left-0 w-full z-40 navbar bg-base-100 shadow-sm px-4">
      <div className="navbar-start">
        <a href="/" className="btn btn-ghost text-xl hover:underline">
          BODEGAS SIGEBO
        </a>
      </div>

      <div className="navbar-end lg:hidden">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="btn btn-square btn-ghost"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {menuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      <div className="hidden lg:flex navbar-end gap-4 items-center">
        {renderAuthButtons()}
        <ColorPicker />
      </div>

      {menuOpen && (
        <div className="absolute top-[4.5rem] right-4 z-50 bg-base-100 shadow-lg rounded-lg p-4 w-60 flex flex-col gap-2 lg:hidden">
          {renderAuthButtons()}
          <ColorPicker />
        </div>
      )}
    </div>
  );
}
