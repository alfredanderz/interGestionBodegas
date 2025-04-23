import React, { useEffect, useState } from "react";
import {
  MdAttachMoney,
  MdPeople,
  MdShoppingCart,
  MdBusiness,
  MdStorage,
} from "react-icons/md";
import DashboardCard from "../../Components/admin/DashboardCard";

const Dashboard = () => {
  const API_URL = "http://localhost:8080";
  const [stats, setStats] = useState({
    totalIncome: 0,
    activeUsers: 0,
    activeRents: 0,
    totalBodegas: 0,
    totalSedes: 0,
    loading: true,
    error: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No se encontró token de autenticación");
        }

        const headers = {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        };

        const fetchWithAuth = async (url) => {
          const response = await fetch(url, { headers });
          if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
          }
          return await response.json();
        };

        const [payments, users, rents, bodegas, sedes] = await Promise.all([
          fetchWithAuth(`${API_URL}/api/pagos/`),
          fetchWithAuth(`${API_URL}/api/usuarios/`),
          fetchWithAuth(`${API_URL}/api/rentas/`),
          fetchWithAuth(`${API_URL}/api/bodegas/`),
          fetchWithAuth(`${API_URL}/api/sedes/`),
        ]);

        // Calcular métricas
        const totalIncome = payments.reduce((sum, pago) => sum + pago.monto, 0);
        const activeUsers = users.length;
        const activeRents = rents.length;
        const totalBodegas = bodegas.length;
        const totalSedes = sedes.length;

        setStats({
          totalIncome,
          activeUsers,
          activeRents,
          totalBodegas,
          totalSedes,
          loading: false,
          error: null,
        });
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        setStats((prev) => ({
          ...prev,
          loading: false,
          error: error.message,
        }));
      }
    };

    fetchData();
  }, []);

  if (stats.loading) return <div className="p-6">Cargando datos...</div>;
  if (stats.error)
    return (
      <div className="p-10 text-red-500 pt-30 md:pt-30 lg:pt-30">
        Lo sentimos, ha ocurrido un {stats.error}
      </div>
    );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 p-6 mt-20">
     <DashboardCard
        title="Sedes"
        value={stats.totalSedes.toLocaleString()}
        description="Sedes registradas"
        icon={MdBusiness}
        onClick={() => console.log("Sedes Clicked")}
      />
      <DashboardCard
        title="Ingresos Totales"
        value={`$${stats.totalIncome.toLocaleString()}`}
        description="Total de pagos recibidos"
        icon={MdAttachMoney}
        onClick={() => console.log("Ingresos Totales Clicked")}
      />
      <DashboardCard
        title="Usuarios Activos"
        value={stats.activeUsers.toLocaleString()}
        description="Usuarios registrados en la plataforma"
        icon={MdPeople}
        onClick={() => console.log("Usuarios Registrados Clicked")}
      />
      <DashboardCard
        title="Rentas Activas"
        value={stats.activeRents.toLocaleString()}
        description="Rentas actualmente en el sistema"
        icon={MdShoppingCart}
        onClick={() => console.log("Rentas Activas Clicked")}
      />
      <DashboardCard
        title="Bodegas"
        value={stats.totalBodegas.toLocaleString()}
        description="Bodegas registradas"
        icon={MdStorage}
        onClick={() => console.log("Bodegas Clicked")}
      />
    
    </div>
  );
};

export default Dashboard;
