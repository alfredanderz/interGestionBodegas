import React, { useState } from "react";

const SedesList = () => {
  const [setSedeToDelete] = useState(null);

  const handleDeleteConfirm = () => {
    setSedeToDelete(null);
    document.getElementById("my_modal_2").close(); // Cierra el modal
  };

  const handleDeleteCancel = () => {
    setSedeToDelete(null);
    document.getElementById("my_modal_2").close(); // Cierra el modal
  };

  return (
    <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100 p-4">
      <table className="table">
        <thead>
          <tr className="bg-base-200">
            <th>#</th>
            <th>Nombre de la Sede</th>
            <th>Ubicación</th>
            <th>Administrador</th>
            <th>Acciones</th>
          </tr>
        </thead>
      </table>

      {/* Modal de confirmación de eliminación */}
      <dialog id="my_modal_2" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">
            ¿Estás seguro de eliminar esta sede?
          </h3>
          <div className="py-4">
            <button
              className="btn btn-sm btn-outline btn-danger mr-2"
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

export default SedesList;
