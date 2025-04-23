import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const SedeForm = ({ sedes, usuarios }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = id !== undefined;

  const initialState = {
    nombre: "",
    direccion: "",
    administradores: [],
  };
  const [formData, setFormData] = useState(initialState);
  const [administradores, setAdministradores] = useState([]);

  useEffect(() => {
    const fetchAdministradores = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/usuarios/");
        const data = await res.json();
        const soloAdmins = data.filter((u) => u.rol === "ADMINISTRADOR");
        setAdministradores(soloAdmins);
      } catch (err) {
        console.error("Error al cargar administradores:", err);
      }
    };

    fetchAdministradores();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = isEditing
      ? `http://localhost:8080/api/sedes/${id}`
      : "http://localhost:8080/api/sedes/";

    const method = isEditing ? "PUT" : "POST";

    try {
      const token = localStorage.getItem("token"); // o desde contexto

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // <--- Aquí el token
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Error al guardar la sede");
      }

      navigate("/admin/sedes");
    } catch (error) {
      console.error(error);
      alert("Ocurrió un error al guardar la sede");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 bg-base-100 rounded-lg shadow-md mt-[80px]"
    >
      <h2 class="text-xl font-bold mb-4 mt-[2px]">
        {isEditing ? "Editar Sede" : "Nueva Sede"}
      </h2>

      {/* Nombre de la Sede */}
      <label className="input validator mb-4">
        <svg
          className="h-[1em] opacity-50"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <g
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeWidth="2.5"
            fill="none"
            stroke="currentColor"
          >
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </g>
        </svg>
        <input
          type="text"
          name="nombre"
          required
          placeholder="Nombre de la Sede"
          pattern="[A-Za-zÁÉÍÓÚáéíóúÑñ ]{3,50}"
          minLength="3"
          maxLength="50"
          title="Solo letras y espacios, entre 3 y 50 caracteres"
          value={formData.nombre}
          onChange={handleChange}
        />
      </label>
      <p className="validator-hint">
        Debe tener entre 3 y 50 caracteres y solo contener letras.
      </p>

      {/* Ubicación de la Sede */}
      <label className="input validator mb-4">
        <svg
          className="h-[1em] opacity-50"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <g
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeWidth="2.5"
            fill="none"
            stroke="currentColor"
          >
            <path d="M12 2a10 10 0 1 1-7.07 2.93A10 10 0 0 1 12 2z"></path>
            <path d="M12 6v6h6"></path>
          </g>
        </svg>
        <input
          type="text"
          name="direccion"
          required
          placeholder="Ubicación de la Sede"
          minLength="5"
          maxLength="100"
          title="Debe tener entre 5 y 100 caracteres"
          value={formData.direccion}
          onChange={handleChange}
        />
      </label>
      <p className="validator-hint">Ingrese la ubicación de la sede.</p>

      <label className="block font-medium mb-2">Administradores</label>
      <select
        multiple
        name="administradores"
        value={formData.administradores}
        onChange={(e) => {
          const selected = Array.from(e.target.selectedOptions, (option) =>
            parseInt(option.value)
          );
          setFormData({ ...formData, administradores: selected });
        }}
        className="w-full h-45 border rounded p-2 appearance-none bg-white [&>option:nth-child(odd)]:bg-gray-200"
      >
        {administradores.map((admin) => (
          <option
            key={admin.id}
            value={admin.id}
            className="hover:bg-blue-50 pl-[20px]" // Opcional: color al hacer hover
          >
            {admin.nombre}
          </option>
        ))}
      </select>
      <p className="text-sm text-gray-900 mt-[25px] mb-[25px]">
        Usa Ctrl (Windows) o Cmd (Mac) para seleccionar varios.
      </p>

      {/* Botón de Envío */}
      <button className="btn custom-bg btn-wide" type="submit">
        {isEditing ? "Guardar Cambios" : "Agregar Sede"}
      </button>
    </form>
  );
};

export default SedeForm;
