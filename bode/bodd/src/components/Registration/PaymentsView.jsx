import React, { useState } from "react";
import cop from "./img/cop.jpg";

export default function PaymentsView() {
  const [paymentDetails, setPaymentDetails] = useState({
    nombre: "",
    clave: "",
    email: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!paymentDetails.nombre.trim()) {
      newErrors.nombre = "Nombre es requerido";
    }
    if (!paymentDetails.clave.trim()) {
      newErrors.clave = "Clave SPEI es requerida";
    } else if (paymentDetails.clave.length < 18) {
      newErrors.clave = "Clave SPEI debe tener 18 dígitos";
    }
    if (!paymentDetails.email) {
      newErrors.email = "Email es requerido";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(paymentDetails.email)) {
      newErrors.email = "Email no válido";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPaymentDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      console.log("Procesando pago con SPEI");
      // await processPayment(paymentDetails);
    } catch (error) {
      console.error("Error en el pago:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Fondo fijo, detrás de todo */}
      <div
        className="fixed inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: `url(${cop})` }}
      />

      {/* Contenido normal, por encima del fondo */}
      <div className="relative z-10 flex flex-col items-center min-h-screen pt-24">
        <h1 className="text-3xl font-bold mb-10 bg-white px-6 py-3 rounded-lg shadow-lg text-black">
          Realiza tu pago con SPEI
        </h1>

        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-center mb-6">
            Detalles de pago
          </h2>

          <form onSubmit={handleSubmit} noValidate>
            <div className="mb-4">
              <label
                htmlFor="nombre"
                className="block text-sm font-semibold mb-2"
              >
                Nombre completo
              </label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={paymentDetails.nombre}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-md ${
                  errors.nombre ? "border-red-500" : "border-gray-300"
                }`}
                required
              />
              {errors.nombre && (
                <p className="text-red-500 text-xs mt-1">{errors.nombre}</p>
              )}
            </div>

            <div className="mb-4">
              <label
                htmlFor="clave"
                className="block text-sm font-semibold mb-2"
              >
                Clave de SPEI (18 dígitos)
              </label>
              <input
                type="text"
                id="clave"
                name="clave"
                value={paymentDetails.clave}
                onChange={handleChange}
                maxLength="18"
                className={`w-full px-4 py-2 border rounded-md ${
                  errors.clave ? "border-red-500" : "border-gray-300"
                }`}
                required
              />
              {errors.clave && (
                <p className="text-red-500 text-xs mt-1">{errors.clave}</p>
              )}
            </div>

            <div className="mb-6">
              <label
                htmlFor="email"
                className="block text-sm font-semibold mb-2"
              >
                Correo electrónico
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={paymentDetails.email}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-md ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
                required
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full bg-[#FF7700] text-white py-2 rounded-md hover:bg-[#a77d4e] transition-colors ${
                isSubmitting ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {isSubmitting ? "Procesando..." : "Realizar pago con SPEI"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
