import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MdDashboard, MdWarehouse, MdPeople } from "react-icons/md";
import { ImClipboard } from "react-icons/im"; // Importación añadida

const SidebarCliente = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div
      className={`fixed top-0 left-0 h-screen custom-bg shadow-lg z-30 ${
        isOpen ? "w-52" : "w-20"
      } transition-all duration-300 p-4 flex flex-col`}
    >
      <br />
      <br />
      <br />
      <button
        className="btn btn-square btn-ghost mb-6 self-end text-3xl"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? "←" : "→"}
      </button>

      <ul className="menu p-0 space-y-2">
        <li>
          <Link to="/renta/" className="flex items-center gap-2">
            <MdDashboard size={24} /> {isOpen && "Dashboard"}
          </Link>
        </li>
        <li>
          <Link to="/renta/sedes" className="flex items-center gap-2">
            <MdWarehouse size={24} /> {isOpen && "Sedes"}{" "}
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default SidebarCliente;
