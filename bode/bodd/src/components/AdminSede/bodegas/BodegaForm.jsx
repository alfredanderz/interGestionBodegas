import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const BodegaForm = () => {
  const { id } = useParams(); // Si hay id, es edición
  const navigate = useNavigate();
  const [bodega, setBodega] = useState({
    precio: "",
    status: "",
    tamano: "",
    descripcion: "",
    sede: { id: "", nombre: "" },
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sedes, setSedes] = useState([]);

  const token = localStorage.getItem("token");
  const sedeId = localStorage.getItem("sedeId");
  const sedeName = localStorage.getItem("sedeName");

  useEffect(() => {
    if (id) {
      setLoading(true);
      fetch(`http://localhost:8080/api/bodegas/id/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          if (!res.ok) throw new Error("Error al obtener la bodega");
          return res.json();
        })
        .then((data) => setBodega(data))
        .catch((err) => setError(err.message))
        .finally(() => setLoading(false));
    }
  }, [id, token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBodega((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Asegura que incluimos el id de la sede si es nuevo
    const bodegaAEnviar = {
      ...bodega,
      sede: id ? bodega.sede : { id: sedeId, nombre: sedeName },
    };

    const method = id ? "PUT" : "POST";
    const url = id
      ? `http://localhost:8080/api/bodegas/${id}`
      : "http://localhost:8080/api/bodegas/";

    fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(bodegaAEnviar),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Error al guardar la bodega");
        return res.json();
      })
      .then(() => navigate("/sedes/bodegas"))
      .catch((err) => {
        console.error(err);
        setError(err.message);
      });
  };

  return (
    <div className="p-6 max-w-xl mx-auto mt-20">
      <h2 className="text-xl font-bold mb-4">
        {id ? "Editar Bodega" : "Agregar Nueva Bodega"}
      </h2>

      {loading ? (
        <p className="text-gray-500">Cargando...</p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <p className="text-red-500">Error: {error}</p>}
          <input
            type="number"
            name="precio"
            placeholder="Precio"
            value={bodega.precio}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
          <select
            name="status"
            value={bodega.status}
            onChange={handleChange}
            className="select select-bordered w-full"
            required
          >
            <option value="" disabled>
              Selecciona el estatus
            </option>
            <option value="VACANTE">Vacante</option>
            <option value="OCUPADA">Ocupada</option>
            <option value="INDISPONIBLE">Fuera de renta</option>
          </select>

          <select
            name="tamano"
            value={bodega.tamano}
            onChange={handleChange}
            className="select select-bordered w-full"
            required
          >
            <option value="" disabled>
              Selecciona el tamaño
            </option>
            <option value="Chica">Chica</option>
            <option value="Mediana">Mediana</option>
            <option value="Grande">Grande</option>
          </select>
          <textarea
            name="descripcion"
            placeholder="Descripción"
            value={bodega.descripcion}
            onChange={handleChange}
            className="textarea textarea-bordered w-full"
            required
          />

          <div className="flex gap-2">
            <button type="submit" className="btn btn-primary">
              Guardar
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => navigate("/sedes/bodegas")}
            >
              Cancelar
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default BodegaForm;
