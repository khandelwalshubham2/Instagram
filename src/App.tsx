import "./App.css";
import { Toaster } from "react-hot-toast";
import QueryProvider from "./lib/react-query/QueryProvider";
import AuthProvider from "./context/AuthContext";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <QueryProvider>
      <AuthProvider>
        <Outlet></Outlet>
        <Toaster></Toaster>
      </AuthProvider>
    </QueryProvider>
  );
}

export default App;
