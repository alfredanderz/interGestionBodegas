import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SedeList from "../../components/admin/sedes/SedesList";

const SedePage = () => {
  const [sedes, setSedes] = useState([]);
  const navigate = useNavigate();

  const fetchSedes = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:8080/api/sedes/", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) throw new Error(`Error ${response.status}`);

      const data = await response.json();
      setSedes(data);
    } catch (err) {
      console.error("Error al cargar sedes:", err);
    }
  };

  const deleteSede = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:8080/api/sedes/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) throw new Error("Error al eliminar sede");

      return true;
    } catch (err) {
      console.error("Error al eliminar:", err);
      return false;
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "¿Estás seguro de eliminar esta sede?"
    );
    if (!confirmDelete) return;

    const success = await deleteSede(id);
    if (success) {
      setSedes((prevSedes) => prevSedes.filter((sede) => sede.id !== id));
    }
  };

  useEffect(() => {
    fetchSedes();
  }, []);

  return (
    <div className="p-6">
      <div className="pt-8 md:pt-20 pb-4">
        <h1 className="text-2xl font-bold mb-4">Gestión de Sedes</h1>
      </div>
      <button
        className="btn custom-bg btn-wide mb-4"
        onClick={() => navigate("new")}
      >
        Agregar Nueva Sede
      </button>

      <SedeList sedes={sedes} onDelete={handleDelete} />
    </div>
  );
};

export default SedePage;
