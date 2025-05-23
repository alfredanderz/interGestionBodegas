import { React, useState } from "react";
import { Link } from "react-router-dom";
import { MdDashboard, MdPeople, MdSecurity } from "react-icons/md";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div
      className={`h-screen  custom-bg  shadow-lg  ${
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
          <Link to="/admin/" className="flex items-center gap-2">
            <MdDashboard size={24} /> {isOpen && "Dashboard"}
          </Link>
        </li>
        <li>
          <Link to="/admin/sedes" className="flex items-center gap-2">
            <MdPeople size={24} /> {isOpen && "Sedes"}
          </Link>
        </li>
        <li>
          <Link to="/admin/administradores" className="flex items-center gap-2">
            <MdSecurity size={24} /> {isOpen && "Administradores"}
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
