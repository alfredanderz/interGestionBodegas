import { useState, useEffect } from "react";
import { Menu, LogOut, Plus, Edit, X, Trash } from "lucide-react";
import Swal from "sweetalert2";
import axios from "axios";

const VistaBodega = () => {
  const [bodegas, setBodegas] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedBodega, setSelectedBodega] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/bodegas/")
      .then((response) => setBodegas(response.data))
      .catch((error) => console.error("Error al obtener bodegas:", error));
  }, []);

  const handleNewBodega = () => {
    window.location.href = "/sedes/gestion";
  };

  const handleEdit = (bodega) => {
    setSelectedBodega(bodega);
    setModalOpen(true);
  };

  const handleDelete = (bodega) => {
    Swal.fire({
      title: `¿Eliminar la bodega ${bodega.id}?`,
      text: "Esta acción no se puede deshacer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#aaa",
      confirmButtonText: "Sí, eliminar",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:8080/api/bodegas/Eliminar/${bodega.id}`)
          .then(() => {
            setBodegas((prev) => prev.filter((b) => b.id !== bodega.id));
            Swal.fire({
              icon: "success",
              title: "Bodega eliminada",
              showConfirmButton: false,
              timer: 1500,
            });
          })
          .catch((error) =>
            console.error("Error al eliminar la bodega:", error)
          );
      }
    });
  };

  const handleInputChange = (field, value) => {
    setSelectedBodega({ ...selectedBodega, [field]: value });
  };

  const validateBodega = (bodega) => {
    if (!bodega.id || bodega.id.trim() === "") {
      return "El folio no puede estar vacío.";
    }
    if (!["Chica", "Mediana", "Grande"].includes(bodega.tamano)) {
      return "Seleccione un tamaño válido (Chica, Mediana o Grande).";
    }
    if (!bodega.edificio || bodega.edificio.trim() === "") {
      return "El edificio no puede estar vacío.";
    }
    if (
      bodega.edificio.trim().length !== 1 ||
      !/[A-Z]/.test(bodega.edificio.trim())
    ) {
      return "El edificio debe ser una letra mayúscula (ej. A, B, C).";
    }
    if (isNaN(bodega.precio) || Number(bodega.precio) <= 0) {
      return "El precio debe ser un número mayor a cero.";
    }
    if (!["Vacante", "Ocupada", "Fuera de venta"].includes(bodega.estado)) {
      return "Seleccione un estado válido (Vacante, Ocupada o Fuera de venta).";
    }
    return null;
  };

  const handleSaveChanges = () => {
    if (!selectedBodega) return;

    const error = validateBodega(selectedBodega);
    if (error) {
      Swal.fire({
        icon: "warning",
        title: "Validación",
        text: error,
      });
      return;
    }

    // Actualizar la bodega
    axios
      .put(
        `http://localhost:8080/api/bodegas/${selectedBodega.id}`,
        selectedBodega
      )
      .then((response) => {
        setBodegas((prev) =>
          prev.map((b) => (b.id === selectedBodega.id ? selectedBodega : b))
        );
        setModalOpen(false);
        Swal.fire({
          icon: "success",
          title: "Bodega actualizada",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Hubo un problema al guardar los cambios.",
        });
        console.error("Error al actualizar bodega:", error);
      });
  };

  const getEstadoColor = (estado) => {
    switch (estado) {
      case "Vacante":
        return "text-green-600";
      case "Ocupada":
        return "text-red-600";
      case "Fuera de venta":
        return "text-yellow-600";
      default:
        return "text-gray-600";
    }
  };

  const handleGoToAnotherPage = () => {
    window.location.href = "/sedes/dashboard";
  };

  return (
    <div>
      <div className="mt-20 w-full max-w-9xl bg-white p-6 md:p-8 rounded-lg shadow-lg border border-gray-200">
        {/* Contenido */}

        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">
            Listado de Bodegas
          </h1>
        </div>
      </div>
    </div>
  );
};

export default VistaBodega;
