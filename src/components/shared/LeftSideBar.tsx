import { useUserContext } from "@/context/AuthContext";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Loader from "./Loader";
import { sidebarLinks } from "@/constant";
import { Button } from "../ui/button";
import { useMutation } from "@tanstack/react-query";
import { signOutAccount } from "@/lib/appwrite/api";

const LeftSideBar = () => {
  const { user, isLoading } = useUserContext();
  const navigate = useNavigate();
  const { mutate: signOutAccountMutate, isSuccess } = useMutation({
    mutationFn: signOutAccount,
    onSuccess: () => {
      navigate(0);
    },
  });
  const signOut = () => {
    signOutAccountMutate();
  };
  return (
    <nav className="leftsidebar">
      <div className="flex flex-col gap-8">
        <Link to="/" className="flex items-start">
          <img src="/src/assets/images/logo.svg"></img>
        </Link>
        <Link to={`/profie/${user.id}`} className="flex items-center gap-2">
          <img
            src={user.imageUrl || "/src/assets/icons/profile-placeholder.svg"}
            className="h-8 w-8 rounded-full"
          ></img>
          {isLoading ? (
            <Loader></Loader>
          ) : (
            <div className="flex flex-col">
              <p className="body-bold">{user.name}</p>
              <p className="small-regular text-light-3">@{user.username}</p>
            </div>
          )}
        </Link>
        <ul className="flex flex-col gap-6">
          {sidebarLinks.map((link) => (
            <li key={link.label} className="leftsidebar-link px-1 py-2 group">
              <NavLink to={link.route} className="flex gap-4 items-center">
                <img
                  src={link.imgURL}
                  className="group-hover:invert-white"
                ></img>
                <span>{link.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
      <Button
        variant="ghost"
        className="shad-button_ghost p-1 mt-auto"
        onClick={signOut}
      >
        <img src="/src/assets/icons/logout.svg" alt="logout" />
        <p className="small-medium lg:base-medium">Logout</p>
      </Button>
    </nav>
  );
};

export default LeftSideBar;
