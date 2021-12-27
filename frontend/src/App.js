import React from "react";
import './App.css';

import RoutesLogic from "./RoutesLogic";
import { AuthContextProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthContextProvider >
      <RoutesLogic />
    </AuthContextProvider>
  );
}

export default App;
