import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import AdminLayout from "../pages/Admin/AdminLayout";
import Dashboard from "../pages/Admin/DashboardPage";
import SedeForm from "../components/admin/sedes/SedeForm";
import UserAdminForm from "../components/admin/userAdmin/UserAdminForm";
import UserAdminPage from "../pages/Admin/UserAdminPage";
import SedePage from "../pages/Admin/SedePage";
import NotFoundView from "../components/NotFoundView";

const AdminRoutes = () => {
  const [administradores, setAdministradores] = useState([]);
  const [sedes] = useState([]);
  const [usuarios] = useState([]);

  return (
    <Routes>
      <Route path="/" element={<AdminLayout />}>
        <Route path="" element={<Dashboard />} />
        <Route path="sedes" element={<SedePage />} />
        <Route
          path="sedes/new"
          element={<SedeForm sedes={sedes} usuarios={usuarios} />}
        />
        <Route
          path="sedes/edit/:id"
          element={<SedeForm sedes={sedes} usuarios={usuarios} />}
        />

        <Route
          path="administradores"
          element={
            <UserAdminPage
              administradores={administradores}
              setAdministradores={setAdministradores}
            />
          }
        />
        <Route path="administradores/new" element={<UserAdminForm />} />
        <Route path="administradores/edit/:id" element={<UserAdminForm />} />
        <Route path="*" element={<NotFoundView />} />
      </Route>
    </Routes>
  );
};

export default AdminRoutes;
