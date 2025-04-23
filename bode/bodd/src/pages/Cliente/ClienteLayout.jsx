import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../../components/admin/Navbar";
import SidebarCliente from "../../components/Wineries/SidebarCliente";
const ClienteLayout = () => {
  return (
    <div className="flex h-screen bg-base-100">
      <SidebarCliente />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default ClienteLayout;
