import React from "react";
import { Outlet } from "react-router-dom"; 
import Sidebar from "../../components/admin/Sidebar"; 
import Navbar from "../../components/admin/Navbar";

const AdminLayout = () => {
  return (
    <div className="flex h-screen bg-base-100">
    
    
      <Sidebar /> 
      
      <div className="flex-1 flex flex-col">
       
        <Navbar />
        
        <main className="flex-1 p-6">
          <Outlet /> 
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
