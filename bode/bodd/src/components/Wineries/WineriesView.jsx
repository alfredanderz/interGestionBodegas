import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import cop from "./img/cop.jpg";
import CheckoutButton from "./CheckoutButton";

export default function BodegasPorSedeView() {
  const [bodegas, setBodegas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sedeInfo, setSedeInfo] = useState(null);
  const { sedeId } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  localStorage.setItem("bodegaId", bodegas.id);
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Obtener información de la sede
        const sedeResponse = await fetch(`http://localhost:8080/api/sedes/id/${sedeId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        });

        if (!sedeResponse.ok) throw new Error("Error al obtener información de la sede");
        const sedeData = await sedeResponse.json();
        setSedeInfo(sedeData);

        // Obtener bodegas de la sede
        const bodegasResponse = await fetch("http://localhost:8080/api/bodegas/", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        });

        if (!bodegasResponse.ok) throw new Error("Error al obtener las bodegas");
        const allBodegas = await bodegasResponse.json();
        
        // Filtrar bodegas por sede (asumiendo que cada bodega tiene un objeto sede con id)
        const bodegasFiltradas = allBodegas.filter(bodega => 
          bodega.sede && bodega.sede.id === parseInt(sedeId)
        );
        
        setBodegas(bodegasFiltradas);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [sedeId, token]);

  const handleRentar = (bodegaId) => {
    navigate(`/rentar/${bodegaId}`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-orange-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-red-500 text-xl">{error}</div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen w-full flex flex-col items-center py-10 relative"
      style={{
        backgroundImage: `url(${cop})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed"
      }}
    >
      <div className="text-center mb-8 bg-white p-4 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-black-600">
          Bodegas Disponibles
        </h1>
        {sedeInfo && (
          <h2 className="text-xl text-gray-700 mt-2">
            Sede: {sedeInfo.nombre} - {sedeInfo.direccion}
          </h2>
        )}
      </div>

      {bodegas.length === 0 ? (
        <div className="bg-white p-8 rounded-lg shadow-lg text-center">
          <p className="text-xl text-gray-700">No hay bodegas disponibles en esta sede</p>
          <button 
            onClick={() => navigate(-1)}
            className="mt-4 bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
          >
            Volver a sedes
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 w-full max-w-6xl">
          {bodegas.map((bodega) => (
            <div
              key={bodega.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-2xl font-bold text-gray-800">{bodega.nombre || `Bodega ${bodega.folio}`}</h2>
                  <span 
                    className={`inline-block text-xs px-2 py-1 rounded-full uppercase font-semibold ${
                      bodega.status !== "Vacante" 
                        ? "bg-red-100 text-red-800" 
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {bodega.status || "Disponible"}
                  </span>
                </div>

                <div className="mb-6">
                  <p className="text-3xl font-bold custom-bg mb-2">
                    ${bodega.precio?.toLocaleString() || "0"} MXN
                  </p>
                  <p className="text-gray-600 mb-1">
                    <span className="font-semibold">Tamaño:</span> {bodega.tamano}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-semibold">Folio:</span> {bodega.folio}
                  </p>
                </div>

                {bodega.descripcion && (
                  <p className="text-gray-700 mb-6 border-t pt-4">
                    {bodega.descripcion}
                  </p>
                )}

                {bodega.status === "Vacante" && <CheckoutButton bodegaId={bodega.id} />}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}