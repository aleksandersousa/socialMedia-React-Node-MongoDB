import RoutesLogic from "./RoutesLogic";
import './App.css'
import { AuthContextProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthContextProvider >
      <RoutesLogic />
    </AuthContextProvider>
  );
}

export default App;
