import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import cop from "./img/cop.jpg";
import { useColor } from "../../context/ColorContext";

export default function SedesClienteView() {
  const [sedes, setSedes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const { color } = useColor();

  useEffect(() => {
    const fetchSedes = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/sedes/", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Error al obtener las sedes");
        }

        const data = await response.json();
        setSedes(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSedes();
  }, [token]);

  const handleVerBodegas = (sedeId) => {
    navigate(`/renta/sedes/${sedeId}/bodegas`);
  };

  if (loading) {
    return (
      <div className="fixed inset-0 flex justify-center items-center z-10">
        <div className="animate-spin rounded-full h-16 w-16 md:h-32 md:w-32 border-t-2 border-b-2 border-orange-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="fixed inset-0 flex justify-center items-center z-10 px-4">
        <div className="text-red-500 text-lg md:text-xl text-center">
          {error}
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Fondo fijo, detrás de todo */}
      <div
        className="fixed inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: `url(${cop})` }}
      />

      {/* Contenido normal, por encima del fondo */}
      <div className="relative z-10 flex flex-col items-center min-h-screen pt-16 md:pt-24 pb-6 md:pb-10 px-4">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 md:mb-10 bg-white px-4 py-2 md:px-6 md:py-3 rounded-lg shadow-lg text-black w-full max-w-md text-center">
          Nuestras Sedes Disponibles:
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 w-full max-w-6xl">
          {sedes.map((sede) => (
            <div
              key={sede.id}
              className="bg-white rounded-lg md:rounded-xl shadow-md hover:shadow-lg md:hover:shadow-xl transition-shadow duration-300"
            >
              <div className="p-4 sm:p-5 md:p-6">
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 mb-2">
                  {sede.nombre}
                </h2>
                <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4 flex items-start sm:items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 sm:h-5 sm:w-5 mr-2 mt-1 sm:mt-0 flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  {sede.direccion}
                </p>

                <div className="mb-3 sm:mb-4">
                  <span
                    className="inline-block text-xs px-2 py-1 rounded-full uppercase font-semibold tracking-wide"
                    style={{
                      backgroundColor: `${color}20`,
                      color: color,
                    }}
                  >
                    Sede {sede.id}
                  </span>
                </div>

                <button
                  onClick={() => handleVerBodegas(sede.id)}
                  className="w-full text-white text-sm sm:text-base font-bold py-2 px-3 sm:px-4 rounded-md sm:rounded-lg transition-colors duration-300 flex items-center justify-center"
                  style={{ backgroundColor: color }}
                >
                  Ver Bodegas
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 sm:h-5 sm:w-5 ml-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
