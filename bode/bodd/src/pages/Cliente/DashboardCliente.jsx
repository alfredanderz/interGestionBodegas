import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdStorage, MdAttachMoney, MdCalendarToday, MdWarning } from "react-icons/md";

const DashboardCliente = () => {
  const [rentas, setRentas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const API_URL = "http://localhost:8080";
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  // Obtener rentas del cliente
  useEffect(() => {
    const obtenerRentasCliente = async () => {
      try {
        if (!user || !user.id) {
          throw new Error("No se pudo identificar al usuario");
        }

        const response = await fetch(`${API_URL}/api/rentas/cliente/${user.id}`, {
          headers: { 
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Error al obtener rentas");
        }

        const data = await response.json();
        setRentas(data);
      } catch (error) {
        console.error("Error:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    obtenerRentasCliente();
  }, [token, user]);

  // Calcular métricas
  const totalBodegas = rentas.length;
  const proximasAVencer = rentas.filter(r => {
    const fechaFin = new Date(r.fechaFin);
    const hoy = new Date();
    const diffTime = fechaFin - hoy;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 30 && diffDays > 0; // Vencen en los próximos 30 días
  }).length;
  const vencidas = rentas.filter(r => new Date(r.fechaFin) < new Date()).length;
  const montoMensual = rentas.reduce((sum, renta) => sum + (renta.bodega?.precio || 0), 0);

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
    <div className="p-6 ml-40 mt-10">
      <h1 className="text-2xl font-bold mb-6">Mis Bodegas Rentadas</h1>
      
      {/* Tarjetas de métricas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {/* Total de bodegas rentadas */}
        <div className="bg-blue-50 p-4 rounded-lg shadow">
          <div className="flex items-center">
            <MdStorage className="text-blue-500 text-2xl mr-2" />
            <div>
              <h3 className="text-gray-600 text-sm">Bodegas Rentadas</h3>
              <p className="text-2xl font-bold">{totalBodegas}</p>
            </div>
          </div>
        </div>
        
        {/* Pago mensual total */}
        <div className="bg-green-50 p-4 rounded-lg shadow">
          <div className="flex items-center">
            <MdAttachMoney className="text-green-500 text-2xl mr-2" />
            <div>
              <h3 className="text-gray-600 text-sm">Pago Mensual Total</h3>
              <p className="text-2xl font-bold">${montoMensual.toLocaleString()}</p>
            </div>
          </div>
        </div>
        
        {/* Próximas a vencer */}
        <div className="bg-yellow-50 p-4 rounded-lg shadow">
          <div className="flex items-center">
            <MdCalendarToday className="text-yellow-500 text-2xl mr-2" />
            <div>
              <h3 className="text-gray-600 text-sm">Próximas a Vencer</h3>
              <p className="text-2xl font-bold">{proximasAVencer}</p>
            </div>
          </div>
        </div>
        
        {/* Vencidas */}
        <div className="bg-red-50 p-4 rounded-lg shadow">
          <div className="flex items-center">
            <MdWarning className="text-red-500 text-2xl mr-2" />
            <div>
              <h3 className="text-gray-600 text-sm">Vencidas</h3>
              <p className="text-2xl font-bold">{vencidas}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Listado de bodegas rentadas */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bodega</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ubicación</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Precio Mensual</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha Inicio</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha Fin</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {rentas.map((renta) => {
              const fechaFin = new Date(renta.fechaFin);
              const hoy = new Date();
              const diffTime = fechaFin - hoy;
              const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
              
              let estado = "";
              let estadoClass = "";
              
              if (diffDays <= 0) {
                estado = "Vencida";
                estadoClass = "bg-red-100 text-red-800";
              } else if (diffDays <= 30) {
                estado = `Vence en ${diffDays} días`;
                estadoClass = "bg-yellow-100 text-yellow-800";
              } else {
                estado = "Activa";
                estadoClass = "bg-green-100 text-green-800";
              }

              return (
                <tr 
                  key={renta.id} 
                  className="hover:bg-gray-50 cursor-pointer"
                  onClick={() => navigate(`/renta/detalle/${renta.id}`)}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {renta.bodega?.folio || "N/A"}
                    </div>
                    <div className="text-sm text-gray-500">
                      {renta.bodega?.descripcion || ""}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {renta.bodega?.sede?.nombre || "N/A"}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ${renta.bodega?.precio?.toLocaleString() || "0"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(renta.fechaInicio).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(renta.fechaFin).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${estadoClass}`}>
                      {estado}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        
        {rentas.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">No tienes bodegas rentadas actualmente</p>
            <button 
              onClick={() => navigate('/renta/nueva')}
              className="mt-4 bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded"
            >
              Rentar una bodega
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardCliente;