import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import cop from "./img/cop.jpg";
import media from "./img/media.png";
import Navbar from "../admin/Navbar";

export default function RegistrationView() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nombre: "",
    apellidoPaterno: "",
    apellidoMaterno: "",
    email: "",
    telefono: "",
    rfc: "",
    direccion: "",
    codigopos: "",
    password: "",
  });

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
{/*
  
    // Verificar si el correo ya está registrado
    try {
      const checkEmail = await fetch(
        `http://localhost:8080/api/usuarios/correo/${formData.email}`
      );

      if (checkEmail.ok) {
        const existingUser = await checkEmail.json();
        if (existingUser && existingUser.email === formData.email) {
          setError("Este correo ya está registrado.");
          return;
        }
      }
    } catch (err) {
      console.error("Error verificando correo:", err);
    }
      */}

    const payload = {
      nombre: formData.nombre,
      apellidoPaterno: formData.apellidoPaterno,
      apellidoMaterno: formData.apellidoMaterno,
      email: formData.email,
      telefono: formData.telefono,
      rfc: formData.rfc,
      direccion: formData.direccion,
      codigopos: formData.codigopos,
      password: formData.password,
      rol: "CLIENTE",
    };

    try {
      const res = await fetch("http://localhost:8080/api/usuarios/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error("No se pudo registrar");
      }

      navigate("/login");
    } catch (err) {
      console.error("Error al registrar:", err);
      setError("Ocurrió un error al registrarse.");
    }
  };

  return (
    <>

    <Navbar/>

    <div
      className="min-h-screen w-screen flex items-center justify-center relative"
      style={{
        backgroundImage: `url(${cop})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >

      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center justify-center w-full py-10"
      >
        <div className="bg-white rounded-xl shadow-xl p-10 w-full max-w-md">
          <img
            src={media}
            alt="ChatMedia Logo"
            className="md:h-20 h-8 object-contain mx-auto mb-10"
          />

          {error && (
            <div className="text-red-600 mb-4 text-sm text-center">{error}</div>
          )}

          <input
            type="text"
            name="nombre"
            placeholder="Nombre"
            required
            pattern="[A-Za-zÁÉÍÓÚáéíóúÑñ ]{3,50}"
            value={formData.nombre}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-sm p-2 mb-4"
          />
          <input
            type="text"
            name="apellidoPaterno"
            placeholder="Apellido Paterno"
            required
            pattern="[A-Za-zÁÉÍÓÚáéíóúÑñ ]{3,50}"
            value={formData.apellidoPaterno}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-sm p-2 mb-4"
          />
          <input
            type="text"
            name="apellidoMaterno"
            placeholder="Apellido Materno"
            required
            pattern="[A-Za-zÁÉÍÓÚáéíóúÑñ ]{3,50}"
            value={formData.apellidoMaterno}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-sm p-2 mb-4"
          />
          <input
            type="email"
            name="email"
            placeholder="Correo electrónico"
            required
            pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-sm p-2 mb-4"
          />
          <input
            type="tel"
            name="telefono"
            placeholder="Teléfono"
            required
            pattern="\d{10}"
            value={formData.telefono}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-sm p-2 mb-4"
          />
          <input
            type="text"
            name="rfc"
            placeholder="RFC"
            required
            pattern="[A-Z]{4}\d{6}[A-Z0-9]{3}"
            value={formData.rfc}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-sm p-2 mb-4"
          />
          <input
            type="text"
            name="direccion"
            placeholder="Dirección"
            required
            pattern="[A-Za-z0-9.,# ]{5,100}"
            value={formData.direccion}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-sm p-2 mb-4"
          />
          <input
            type="text"
            name="codigopos"
            placeholder="Código Postal"
            required
            pattern="\d{5}"
            value={formData.codigopos}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-sm p-2 mb-4"
          />
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            required
            minLength={6}
            value={formData.password}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-sm p-2 mb-6"
          />

          <button
            type="submit"
            className="w-full custom-bg text-white py-2 rounded-md mb-4 "
          >
            Registrarse
          </button>

          <div className="text-center">
            <a
              href="/login"
              className="text-sm text-gray-600 hover:underline hover:text-black"
            >
              ¿Ya tienes cuenta? Inicia sesión
            </a>
          </div>
        </div>
      </form>
    </div>
    </>
    
  );
}
