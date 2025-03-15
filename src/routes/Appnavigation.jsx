import React from "react";
import { useRoutes } from "react-router-dom";
import LoginPage from "../pages/app/LoginPage";
import AdminDashboard from "../pages/app/AdminDashboard";
// import TruckManagement from "./pages/app/TruckManagement";
// import DriverManagement from "./pages/app/DriverManagement";
// import RouteManagement from "./pages/app/RouteManagement";
// import DeliveryTracking from "./pages/app/DeliveryTracking";
// import Reports from "./pages/app/Reports";
import DriverDashboard from "../pages/app/DriverDashboard";
// import MyRoutes from "./pages/app/MyRoutes";
// import DeliveryStatus from "./pages/app/DeliveryStatus";
// import MaintenanceLogs from "./pages/app/MaintenanceLogs";
// import DispatcherDashboard from "./pages/app/DispatcherDashboard";
// import DeliveryAssignments from "./pages/app/DeliveryAssignments";
// import RoutePlanning from "./pages/app/RoutePlanning";
// import DriverCommunication from "./pages/app/DriverCommunication";
// import ShiftManagement from "./pages/app/ShiftManagement";
import Blog from '../pages/app/Blog'
import MyTruck from '../pages/app/TruckManagement'
import Layout from "./layout"; 
import Registration from "../pages/app/RegisterPage";

export default function AppNavigation() {
  const element = useRoutes([
    {
      path: "/",
      element: <LoginPage />, 
      children: [{ index: true }],
    },
    {
      path: "/signup",
      element: <Registration/>, 
    },
    {
      path: "/admin",
      element: <Layout />,
      children: [
         { path: "admin-dashboard", element: <AdminDashboard />},
         { path: "blog", element: <Blog />},
        // { path: "truck-management", element: <TruckManagement /> },
        // { path: "driver-management", element: <DriverManagement /> },
        // { path: "route-management", element: <RouteManagement /> },
        // { path: "delivery-tracking", element: <DeliveryTracking /> },
        // { path: "reports", element: <Reports /> },
      ],
     
    },
   
    {
      path: "/driver",
      element: <Layout />, 
      children: [
        { path: "dashboard", element: <DriverDashboard /> },
        { path: "my-truck", element: <MyTruck /> },
        // { path: "delivery-status", element: <DeliveryStatus /> },
        // { path: "maintenance-logs", element: <MaintenanceLogs /> },
      ],
    },
   
    // {
    //   path: "/dispatcher",
    //   element: <Layout />, 
    //   children: [
    //     { path: "dashboard", element: <DispatcherDashboard /> },
    //     { path: "delivery-assignments", element: <DeliveryAssignments /> },
    //     { path: "route-planning", element: <RoutePlanning /> },
    //     { path: "driver-communication", element: <DriverCommunication /> },
    //     { path: "shift-management", element: <ShiftManagement /> },
    //   ],
    // },
  ]);

  return element;
}
