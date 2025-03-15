import React from "react";
import AppNavigation from "./routes/Appnavigation"; // The AppNavigation component you created
import "./App.css";
import { Toaster } from 'react-hot-toast';
import { RoleProvider } from "./utils/Context/RoleContext ";
 // Optional: Import your global styles here if needed

function App() {
  return (
    <div>
        <RoleProvider>
    <Toaster />
      <AppNavigation />
      </RoleProvider>
      </div>
   
  );
}

export default App;
