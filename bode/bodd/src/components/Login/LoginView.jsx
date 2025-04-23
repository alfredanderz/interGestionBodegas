import React, { useState, useEffect } from "react";
import back from "./img/cop.jpg";
import media from "./img/media.png";
import front from "./img/front.png";
import Navbar from "../admin/Navbar";

function parseJwt(token) {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch {
    return null;
  }
}
const images = [
  front,
  "https://todowine.com/wp-content/uploads/2022/03/bodealba-almacen.png",
  "https://png.pngtree.com/png-clipart/20240317/original/pngtree-construction-worker-builder-man-png-image_14611987.png",
  "https://irp.cdn-website.com/9873f9dd/MOBILE/png/896.png",
  "https://irp.cdn-website.com/c78ea348/MOBILE/png/975.png",
  "https://cdn.pixabay.com/photo/2018/06/25/23/06/winery-3498194_1280.png",
];

export default function LoginView() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Todos los campos son obligatorios.");
      return;
    }

    if (!validateEmail(email)) {
      setError("Por favor, ingresa un correo electrónico válido.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Credenciales inválidas");
      }

      const token = await response.text();
      localStorage.setItem("token", token);

      const payload = parseJwt(token);
      const role = payload?.role;
      localStorage.setItem("user", JSON.stringify(payload));


      switch (role) {
        case "SUPERADMINISTRADOR":
          window.location.href = "/admin/";
          break;
        case "ADMINISTRADOR":
          window.location.href = "/sedes/";
          break;
        case "CLIENTE":
          window.location.href = "/renta/";
          break;
        default:
          setError("Rol no reconocido.");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  return (
    <>
      <Navbar />

      <div
        className="h-screen w-screen flex items-center justify-center relative"
        style={{
          backgroundImage: `url(${back})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="flex flex-col md:flex-row w-full max-w-6xl gap-8 px-4">
          {/* Formulario */}
          <div className="flex flex-col items-center w-full md:w-2/5">
            <div className="bg-white rounded-xl shadow-xl p-6 md:p-10 w-full max-w-sm">
              <img
                src={media}
                alt="Logo"
                className="h-8 md:h-20 object-contain mx-auto mb-6 md:mb-10"
              />

              {error && <p className="custom-bg text-center mb-4">{error}</p>}

              <form onSubmit={handleSubmit}>
                <input
                  type="email"
                  placeholder="Correo electrónico"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-gray-300 rounded-sm p-2 mb-4 focus:outline-none"
                />
                <input
                  type="password"
                  placeholder="Contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border border-gray-300 rounded-sm p-2 mb-4 focus:outline-none"
                />

                <button
                  type="submit"
                  className="w-full custom-bg text-white py-2 rounded-md mb-4 block text-center hover:bg-[#a77d4e]"
                >
                  Entrar
                </button>
              </form>

              <div className="text-center mb-6">
                <a
                  href="/lost-password"
                  className="text-sm text-gray-600 hover:underline hover:text-black"
                >
                  ¿Has olvidado la contraseña?
                </a>
              </div>
            </div>

            <div className="bg-white rounded-md p-4 mt-4 w-full max-w-sm text-center shadow-sm text-sm text-gray-600">
              ¿No tienes una cuenta?{" "}
              <a href="/register" className="custom-bg hover:underline">
                Regístrate
              </a>
            </div>
          </div>

          <div className="w-full md:w-2/5 hidden md:flex items-center justify-center relative">
            <div className="relative w-full h-full">
              <img
                src={images[currentImageIndex]}
                alt={`Imagen ${currentImageIndex + 1}`}
                className="absolute top-[10px] left-[250px] w-108 h-108 object-contain mix-blend-normal bg-transparent"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
