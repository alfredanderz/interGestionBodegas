import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserAdminList from "../../components/admin/userAdmin/UserAdminList";

const UserAdminPage = () => {
  const [users, setUsers] = useState([]);
  const [userToDelete, setUserToDelete] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8080/api/usuarios/")
      .then((res) => {
        if (!res.ok) throw new Error("Error al obtener usuarios");
        return res.json();
      })
      .then((data) => setUsers(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const handleDeleteClick = (id) => {
    setUserToDelete(id);
    document.getElementById("delete_modal").showModal();
  };

  const handleDeleteConfirm = () => {
    fetch(`http://localhost:8080/api/usuarios/${userToDelete}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Error al eliminar usuario");
        setUsers(users.filter((user) => user.id !== userToDelete));
        setUserToDelete(null);
        document.getElementById("delete_modal").close();
      })
      .catch((err) => {
        console.error(err);
        alert("Hubo un error al eliminar el usuario");
        document.getElementById("delete_modal").close();
      });
  };

  const handleDeleteCancel = () => {
    setUserToDelete(null);
    document.getElementById("delete_modal").close();
  };

  const adminUsers = users.filter((user) => user.rol === "ADMINISTRADOR");

  return (
    <div className="container mx-auto px-4 py-6 sm:px-6 lg:px-8">
      <br />
      <br />
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
          Administradores
        </h1>
        <button
          className="btn custom-bg w-full md:w-auto hover:bg-[#a77d4e] transition-colors"
          onClick={() => navigate("new")}
        >
          Agregar Administrador
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
        </div>
      ) : error ? (
        <div className="alert alert-error shadow-lg">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current flex-shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>Error: {error}</span>
          </div>
        </div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <UserAdminList users={adminUsers} onDelete={handleDeleteClick} />
        </div>
      )}

      {/* Modal de confirmación */}
      <dialog id="delete_modal" className="modal">
        <div className="modal-box w-11/12 max-w-md">
          <h3 className="font-bold text-lg">
            ¿Estás seguro de eliminar este administrador?
          </h3>
          <p className="py-4">Esta acción no se puede deshacer.</p>
          <div className="modal-action flex justify-end gap-2">
            <button
              className="btn btn-error btn-sm sm:btn-md"
              onClick={handleDeleteConfirm}
            >
              Confirmar
            </button>
            <button
              className="btn btn-outline btn-sm sm:btn-md"
              onClick={handleDeleteCancel}
            >
              Cancelar
            </button>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
};

export default UserAdminPage;
