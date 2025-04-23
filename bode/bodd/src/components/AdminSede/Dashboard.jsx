import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const DashboardSede = () => {
  const [bodegas, setBodegas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [nombreSede, setNombreSede] = useState("");
  const navigate = useNavigate();
  const API_URL = "http://localhost:8080";
  const token = localStorage.getItem("token");

  // Obtener datos de la sede y bodegas
  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        // 1. Obtener sede del usuario
        const usuario = JSON.parse(localStorage.getItem("user"));
        const responseSede = await fetch(`${API_URL}/api/sedes/usuario/correo/${usuario.sub}`, {
          headers: { "Authorization": `Bearer ${token}` }
        });

        if (!responseSede.ok) throw new Error("Error al obtener sede");
        
        const sede = await responseSede.json();
        setNombreSede(sede.nombre);

        // 2. Obtener todas las bodegas (como en tu BodegaPage)
        const responseBodegas = await fetch("http://localhost:8080/api/bodegas/", {
          headers: { "Authorization": `Bearer ${token}` }
        });

        if (!responseBodegas.ok) throw new Error("Error al obtener bodegas");
        
        const data = await responseBodegas.json();
        setBodegas(data);

      } catch (error) {
        console.error("Error:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    obtenerDatos();
  }, [token]);

  // Calcular métricas básicas
  const totalBodegas = bodegas.length;
  const bodegasOcupadas = bodegas.filter(b => b.estado === "ocupada").length;
  const bodegasVacantes = bodegas.filter(b => b.estado === "vacante").length;

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-center text-red-500">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="p-6 mt-20">
      <h1 className="text-2xl font-bold mb-6">Dashboard - {nombreSede}</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-blue-50 p-4 rounded-lg text-center shadow">
          <h3 className="text-gray-600">Total Bodegas</h3>
          <p className="text-3xl font-bold">{totalBodegas}</p>
        </div>
        
        <div className="bg-green-50 p-4 rounded-lg text-center shadow">
          <h3 className="text-gray-600">Bodegas Ocupadas</h3>
          <p className="text-3xl font-bold">{bodegasOcupadas}</p>
        </div>
        
        <div className="bg-yellow-50 p-4 rounded-lg text-center shadow">
          <h3 className="text-gray-600">Bodegas Vacantes</h3>
          <p className="text-3xl font-bold">{bodegasVacantes}</p>
        </div>
      </div>

  
    </div>
  );
};

export default DashboardSede;