// src/components/NotFoundView.jsx
import React from "react";
import { Link } from "react-router-dom";

const NotFoundView = () => (
  <div className="h-screen flex flex-col items-center justify-center text-center px-4">
    <h1 className="text-6xl font-bold mb-4">404</h1>
    <p className="text-lg mb-4">Página no encontrada o acceso no autorizado.</p>
    <Link
      to="/"
      className="bg-[#FF7700] text-white px-4 py-2 rounded hover:bg-orange-600 transition"
    >
      Volver al inicio
    </Link>
  </div>
);

export default NotFoundView;
