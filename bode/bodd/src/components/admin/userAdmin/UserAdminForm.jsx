import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const UserAdminForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = id !== undefined;

  const initialState = {
    nombre: "",
    apellidoPaterno: "",
    apellidoMaterno: "",
    email: "",
    telefono: "",
    rfc: "",
    direccion: "",
    codigopos: "",
    password: "",
  };

  const [formData, setFormData] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      if (isEditing) {
        setLoading(true);
        try {
          const response = await fetch(
            `http://localhost:8080/api/usuarios/id/${id}`
          );
          if (!response.ok) throw new Error("No se pudo obtener el usuario");
          const data = await response.json();
          setFormData({
            nombre: data.nombre || "",
            apellidoPaterno: data.apellidoPaterno || "",
            apellidoMaterno: data.apellidoMaterno || "",
            email: data.email || "",
            telefono: data.telefono || "",
            rfc: data.rfc || "",
            direccion: data.direccion || "",
            codigopos: data.codigopos || "",
            contrasena: data.password || "",
          });
        } catch (err) {
          console.error("Error cargando el usuario:", err);
          setError("No se pudo cargar el usuario.");
        } finally {
          setLoading(false);
        }
      }
    };
    fetchUser();
  }, [id, isEditing]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      rol: "ADMINISTRADOR",
      password: "Admin123!",
    };

    const method = isEditing ? "PUT" : "POST";
    const url = isEditing
      ? `http://localhost:8080/api/usuarios/${id}`
      : `http://localhost:8080/api/usuarios/`;

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("No se pudo guardar");

      navigate("/admin/administradores");
    } catch (err) {
      alert("Error al guardar: " + err.message);
    }
  };

  if (loading) return <p className="p-6">Cargando datos del usuario...</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;

  return (
    <div className="px-4 py-6 mt-[30px]">
      <form
        onSubmit={handleSubmit}
        className="bg-base-100 p-6 sm:p-10 rounded-lg shadow-md max-w-3xl w-full mx-auto"
      >
        <h2 className="text-2xl font-bold mb-6">
          {isEditing ? "Editar Administrador" : "Nuevo Administrador"}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            {
              name: "nombre",
              label: "Nombre",
              pattern: "[A-Za-zÁÉÍÓÚáéíóúÑñ ]{3,50}",
              hint: "Debe tener entre 3 y 50 caracteres y solo letras.",
            },
            {
              name: "apellidoPaterno",
              label: "Apellido Paterno",
              pattern: "[A-Za-zÁÉÍÓÚáéíóúÑñ ]{3,50}",
              hint: "Debe tener entre 3 y 50 caracteres.",
            },
            {
              name: "apellidoMaterno",
              label: "Apellido Materno",
              pattern: "[A-Za-zÁÉÍÓÚáéíóúÑñ ]{3,50}",
              hint: "Debe tener entre 3 y 50 caracteres.",
            },
            {
              name: "email",
              type: "email",
              label: "Correo Electrónico",
              pattern: "[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}",
              hint: "Debe ser un correo válido.",
            },
            {
              name: "telefono",
              type: "tel",
              label: "Teléfono",
              pattern: "\\d{10}",
              hint: "10 dígitos (solo números)",
              inputProps: {
                inputMode: "numeric",
              },
            },
            {
              name: "rfc",
              label: "RFC",
              pattern: "[A-Z]{4}\\d{6}[A-Z0-9]{3}",
              hint: "Debe ser un RFC válido.",
            },
            {
              name: "direccion",
              label: "Dirección",
              pattern: "[A-Za-z0-9.,# ]{5,100}",
              hint: "Entre 5 y 100 caracteres.",
            },
            {
              name: "codigopos",
              label: "Código Postal",
              pattern: "\\d{5}",
              hint: "Debe tener 5 dígitos.",
            },
            {
              name: "password",
              label: "Contraseña",
              pattern:
                "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$",
              hint: "Debe contener al menos 8 caracteres, incluyendo mayúsculas, minúsculas, números y caracteres especiales (@$!%*?&).",
              inputProps: {
                type: "password",
                autoComplete: "new-password",
              },
            },
          ].map(({ name, label, pattern, hint, type = "text" }) => (
            <div key={name}>
              <label className="input validator">
                <input
                  type={type}
                  name={name}
                  required
                  placeholder={label}
                  pattern={pattern}
                  value={formData[name]}
                  onChange={handleChange}
                />
              </label>
              <p className="validator-hint">{hint}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 text-center">
          <button type="submit" className="btn custom-bg btn-wide">
            {isEditing ? "Guardar Cambios" : "Agregar Administrador"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserAdminForm;
