import React from "react";
import { Routes, Route } from "react-router-dom";
import ClienteLayout from "../pages/Cliente/ClienteLayout";
import WineriesView from "../components/Wineries/WineriesView";
import ExpirationView from "../components/Registration/ExpirationView";
import NotFoundView from "../components/NotFoundView";
import SedesClienteView from "../components/Wineries/SedesView";
import BodegasPorSedeView from "../components/Wineries/WineriesView";
import PaymentsView from "../components/Registration/PaymentsView";
import PagoExitoso from "../components/Wineries/PagoExitoso";
import DashboardCliente from "../pages/Cliente/DashboardCliente";

const ClienteRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<ClienteLayout />}>
        <Route path="" element={<DashboardCliente />} />
        <Route path="bodegas" element={<WineriesView />} />
        <Route path="sedes" element={<SedesClienteView />} />
        <Route path="sedes/:sedeId/bodegas" element={<BodegasPorSedeView />} />
        <Route path="wineries" element={<ExpirationView />} />
        <Route path="pago-exitoso" element={<PagoExitoso/>} />
        <Route path="paymentsView" element={<PaymentsView />} />

        {/*
        <Route path="bodegas/rentar/:bodegaId" element={<RentarBodegaView />} />
        */}

        <Route path="ExpirationView" element={<ExpirationView />} />
        <Route path="*" element={<NotFoundView />} />
      </Route>
    </Routes>
  );
};

export default ClienteRoutes;
