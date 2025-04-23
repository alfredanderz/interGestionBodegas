import { useState, useEffect } from "react";

import Swal from "sweetalert2";
import axios from "axios";

const VistaBodega = () => {
  const [setBodegas] = useState([]);
  const [setModalOpen] = useState(false);
  const [selectedBodega] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/bodegas/")
      .then((response) => setBodegas(response.data))
      .catch((error) => console.error("Error al obtener bodegas:", error));
  });

  // Actualizar la bodega
  axios
    .put(
      `http://localhost:8080/api/bodegas/${selectedBodega.id}`,
      selectedBodega
    )
    .then(() => {
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

export default VistaBodega;
