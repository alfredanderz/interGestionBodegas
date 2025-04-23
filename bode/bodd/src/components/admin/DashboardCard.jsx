import React from "react";

const DashboardCard = ({ title, value, description, icon: Icon, onClick }) => {
  return (
    <div className="w-full sm:w-40 md:w-48 lg:w-56 bg-white rounded-lg shadow-sm p-3 hover:shadow-md transition duration-300">
    <div className="flex flex-col items-center text-center h-full">
      {Icon && <Icon className="text-3xl md:text-4xl text-blue-500 mb-2" />}
      <h2 className="text-sm md:text-base font-semibold">{title}</h2>
      <p className="text-xl md:text-2xl font-bold my-1">{value}</p>
      <p className="text-xs md:text-sm text-gray-500 mt-auto">{description}</p>
    </div>
  </div>
  );
};

export default DashboardCard;
