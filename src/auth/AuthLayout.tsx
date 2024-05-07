import { Navigate, Outlet } from "react-router-dom";
import SignupForm from "./form/SignupForm";
import { useUserContext } from "@/context/AuthContext";

const AuthLayout = () => {
  const { isAuthenticated } = useUserContext();
  return isAuthenticated ? (
    <Navigate to="/"></Navigate>
  ) : (
    <section className="flex min-h-screen">
      <div className="flex justify-center items-center flex-1">
        <Outlet></Outlet>
      </div>

      <div className="flex-1 hidden xl:block signup-layout-right-side"></div>
    </section>
  );
};

export default AuthLayout;
