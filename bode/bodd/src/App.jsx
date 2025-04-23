import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import NotFoundView from "./components/NotFoundView";
import ClienteRoutes from "./routes/ClienteRoutes";
import SedeAdminRoutes from "./routes/SedesAdminRoutes";
import AdminRoutes from "./routes/AdminRoutes";

import MainView from "./components/MainPage/MainView";
import LoginView from "./components/Login/LoginView";
import RegistrationView from "./components/Registration/RegistrationView";
import Password from "./components/Registration/Password";

import "./App.css";

function parseJwt(token) {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch {
    return null;
  }
}

const getUserRole = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;
  const payload = parseJwt(token);
  return payload?.role || null;
};

const AnimatedRoutes = () => {
  const location = useLocation();
  const userRole = getUserRole();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<MainView />} />
        <Route path="/login" element={<LoginView />} />
        <Route path="/register" element={<RegistrationView />} />
        <Route path="/lost-password" element={<Password />} />
        {userRole === "CLIENTE" ? (
          <Route path="/renta/*" element={<ClienteRoutes />} />
        ) : null}

        {userRole === "SUPERADMINISTRADOR" ? (
          <Route path="/admin/*" element={<AdminRoutes />} />
        ) : null}
        {userRole === "ADMINISTRADOR" ? (
          <Route path="/sedes/*" element={<SedeAdminRoutes />} />
        ) : null}

        <Route path="*" element={<NotFoundView />} />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <Router>
      <AnimatedRoutes />
    </Router>
  );
}

export default App;
