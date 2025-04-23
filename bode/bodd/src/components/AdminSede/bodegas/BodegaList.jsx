import React from "react";
import { useNavigate } from "react-router-dom";

const BodegaList = ({ bodegas, onDelete }) => {
  const navigate = useNavigate();

  return (
    <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100 p-4">
      <h2 className="text-xl font-bold mb-4">Lista de Bodegas</h2>
      <table className="table w-full">
        <thead>
          <tr className="bg-base-200">
            <th>#</th>
            <th>Folio</th>
            <th>Precio</th>
            <th>Estatus</th>
            <th>Tamaño</th>
            <th>Descripción</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {bodegas.length > 0 ? (
            bodegas.map((bodega, index) => (
              <tr key={bodega.id} className="hover">
                <th>{index + 1}</th>
                <td>{bodega.folio}</td>
                <td>${bodega.precio}</td>
                <td>{bodega.status}</td>
                <td>{bodega.tamano}</td>
                <td>{bodega.descripcion}</td>
                <td>
                  <button
                    className="btn btn-sm btn-outline btn-primary mr-2"
                    onClick={() =>
                      navigate(`/sedes/bodegas/edit/${bodega.id}`)
                    }
                  >
                    Editar
                  </button>
                  <button
                    className="btn btn-sm btn-outline btn-error"
                    onClick={() => onDelete(bodega.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center text-gray-500 py-4">
                No hay bodegas registradas.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default BodegaList;
