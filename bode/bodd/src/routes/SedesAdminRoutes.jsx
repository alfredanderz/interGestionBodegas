import React from "react";
import { Route, Routes } from "react-router-dom";
import BodegaGestion from "../components/AdminSede/sede/AgregarBodega";
import VistaBodega from "../components/AdminSede/sede/VistaBodegas";
import VistaCliente from "../components/AdminSede/sede/ListaClientes";
import NotFoundView from "../components/NotFoundView";
import SedesLayout from "../pages/AdminSede/SedesLayout";
import DashboardAdministrador from "../components/AdminSede/Dashboard";
import BodegaPage from "../components/AdminSede/bodegas/BodegaPage";
import BodegaForm from "../components/AdminSede/bodegas/BodegaForm";
const SedeAdminRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<SedesLayout />}>
        <Route path="" element={<DashboardAdministrador />} />
        <Route path="bodegas" element={<BodegaPage />} />
        <Route path="bodegas/new" element={<BodegaForm />} />
        <Route path="bodegas/edit/:id" element={<BodegaForm />} />
        <Route path="clientes" element={<VistaBodega />} />
        <Route path="vistacliente" element={<VistaCliente />} />
        
        <Route path="*" element={<NotFoundView />} />
      </Route>
    </Routes>
  );
};

export default SedeAdminRoutes;
