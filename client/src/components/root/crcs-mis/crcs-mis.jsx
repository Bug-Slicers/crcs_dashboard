import React, { useState } from "react";
import AdminLogin from "./admin-login";
import SocietiesLogin from "./societies-login";
import SocietiesRegistration from "./societies-registration";

export default function CRCS_MIS() {
  const [activeTab, setActiveTab] = useState("registration");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 font-poppins ">
      <div className="flex space-x-4 mb-4">
        <button
          onClick={() => handleTabChange("registration")}
          className={`text-base py-2 px-4 rounded-md ${
            activeTab === "registration"
              ? "bg-primary text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          New Societies Registration
        </button>
        <button
          onClick={() => handleTabChange("login")}
          className={`py-2 px-4 rounded-md ${
            activeTab === "login"
              ? "bg-primary text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          Societies Login
        </button>
        <button
          onClick={() => handleTabChange("admin")}
          className={`py-2 px-4 rounded-md ${
            activeTab === "admin"
              ? "bg-primary text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          Admin Login
        </button>
      </div>
      {activeTab === "registration" && (
        // Societies Registration Page
        <SocietiesRegistration />
      )}
      {activeTab === "login" && (
        // Societies Login Page
        <SocietiesLogin />
      )}
      {activeTab === "admin" && (
        //  Admin Login Page
        <AdminLogin />
      )}
    </div>
  );
}
