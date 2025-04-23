import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BodegaList from "./BodegaList";

const BodegaPage = () => {
  const [bodegas, setBodegas] = useState([]);
  const [bodegaToDelete, setBodegaToDelete] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const fetchBodegas = () => {
    fetch("http://localhost:8080/api/bodegas/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Error al obtener bodegas");
        return res.json();
      })
      .then((data) => setBodegas(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchBodegas();
  }, []);

  const handleDeleteClick = (id) => {
    setBodegaToDelete(id);
    document.getElementById("delete_modal_bodega").showModal();
  };

  const handleDeleteConfirm = () => {
    fetch(`http://localhost:8080/api/bodegas/eliminar/${bodegaToDelete}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Error al eliminar la bodega");
        setBodegas((prev) => prev.filter((b) => b.id !== bodegaToDelete));
        setBodegaToDelete(null);
        document.getElementById("delete_modal_bodega").close();
      })
      .catch((err) => {
        console.error(err);
        alert("Hubo un error al eliminar la bodega");
        document.getElementById("delete_modal_bodega").close();
      });
  };

  const handleDeleteCancel = () => {
    setBodegaToDelete(null);
    document.getElementById("delete_modal_bodega").close();
  };

  return (
    <div className="p-6 mt-20">
      <h1 className="text-2xl font-bold mb-4">Bodegas</h1>

      <button
        className="btn custom-bg btn-wide mb-4"
        onClick={() => navigate("/sedes/bodegas/new")}
      >
        Agregar Nueva Bodega
      </button>

      {loading ? (
        <p className="text-gray-500">Cargando bodegas...</p>
      ) : error ? (
        <p className="text-red-500">Error: {error}</p>
      ) : (
        <BodegaList bodegas={bodegas} onDelete={handleDeleteClick} />
      )}

      <dialog id="delete_modal_bodega" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">
            ¿Estás seguro de eliminar esta bodega?
          </h3>
          <div className="py-4">
            <button
              className="btn btn-sm btn-outline btn-error mr-2"
              onClick={handleDeleteConfirm}
            >
              Confirmar
            </button>
            <button
              className="btn btn-sm btn-outline btn-secondary"
              onClick={handleDeleteCancel}
            >
              Cancelar
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default BodegaPage;
