import React from "react";
import { Outlet } from "react-router-dom";
import SidebarSede from "../../components/AdminSede/SidebarSede";
import Navbar from "../../components/admin/Navbar";

const SedesLayout = () => {
  return (
    <div className="flex h-screen">
      <SidebarSede />
      <Navbar />
      <div className="flex-1 p-6 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default SedesLayout;
