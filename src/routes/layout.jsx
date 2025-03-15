import React from "react";
import { Outlet } from "react-router-dom"; // Renders the child routes dynamically
import Pages from "../pages/page"; // Import the AppSidebar component

export default function Layout({ role = "admin" }) {
  return (
    <div className="flex h-screen">
      <Pages role={role} className="w-64" />
     
    </div>
  );
}
