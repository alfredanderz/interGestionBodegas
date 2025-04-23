import React from "react";
import cop from "./img/cop.jpg";

export default function ExpirationView() {
  return (
    <div
      className="h-screen w-screen flex flex-col items-center relative"
      style={{
        backgroundImage: `url(${cop})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <h1 className="text-3xl font-bold text-orange-600 my-10 mt-45">
        Detalles de vencimiento de bodegas
      </h1>

      <div className="w-full max-w-6xl bg-white p-8 rounded-lg shadow-md">
        <table className="w-full table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left">Folio</th>
              <th className="px-4 py-2 text-left">Tamaño</th>
              <th className="px-4 py-2 text-left">Precio</th>
              <th className="px-4 py-2 text-left">Vencimiento</th>
              <th className="px-4 py-2 text-left">Estado</th>
              <th className="px-4 py-2 text-left">Acción</th>
            </tr>
          </thead>
        </table>
      </div>
    </div>
  );
}
