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

  const handleFetchResponse = async (response) => {
    if (!response.ok) throw new Error("Error al obtener bodegas");
    return response.json();
  };

  const handleFetchError = (error) => {
    setError(error.message);
    setLoading(false);
  };

  const fetchBodegas = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/bodegas/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await handleFetchResponse(response);
      setBodegas(data);
    } catch (err) {
      handleFetchError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBodegas();
  });

  const toggleModal = (action = "close") => {
    const modal = document.getElementById("delete_modal_bodega");
    if (action === "show") modal.showModal();
    else modal.close();
  };

  const handleDeleteClick = (id) => {
    setBodegaToDelete(id);
    toggleModal("show");
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/bodegas/eliminar/${bodegaToDelete}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!response.ok) throw new Error("Error al eliminar la bodega");

      setBodegas((prev) => prev.filter((b) => b.id !== bodegaToDelete));
      setBodegaToDelete(null);
      toggleModal();
    } catch (err) {
      console.error(err);
      alert("Hubo un error al eliminar la bodega");
      toggleModal();
    }
  };

  const handleDeleteCancel = () => {
    setBodegaToDelete(null);
    toggleModal();
  };

  const renderContent = () => {
    if (loading) return <p className="text-gray-500">Cargando bodegas...</p>;
    if (error) return <p className="text-red-500">Error: {error}</p>;
    return <BodegaList bodegas={bodegas} onDelete={handleDeleteClick} />;
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

      {renderContent()}

      <DeleteConfirmationModal
        onConfirm={handleDelete}
        onCancel={handleDeleteCancel}
      />
    </div>
  );
};

const DeleteConfirmationModal = ({ onConfirm, onCancel }) => (
  <dialog id="delete_modal_bodega" className="modal">
    <div className="modal-box">
      <h3 className="font-bold text-lg">
        ¿Estás seguro de eliminar esta bodega?
      </h3>
      <div className="py-4">
        <button
          className="btn btn-sm btn-outline btn-error mr-2"
          onClick={onConfirm}
        >
          Confirmar
        </button>
        <button
          className="btn btn-sm btn-outline btn-secondary"
          onClick={onCancel}
        >
          Cancelar
        </button>
      </div>
    </div>
  </dialog>
);

export default BodegaPage;
