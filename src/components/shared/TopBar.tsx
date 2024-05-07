import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { useUserContext } from "@/context/AuthContext";
import { signOutAccount } from "@/lib/appwrite/api";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";

const TopBar = () => {
  const navigate = useNavigate();
  const { user } = useUserContext();
  const { mutate: signOutAccountMutate, isSuccess } = useMutation({
    mutationFn: signOutAccount,
    onSuccess: () => {
      navigate(0);
    },
  });

  const signOut = () => {
    signOutAccountMutate();
  };

  //   useEffect(() => {
  //     console.log(isSuccess);
  //     if (isSuccess) {
  //       console.log("log out");
  //       navigate(0);
  //     }
  //   }, [isSuccess]);
  return (
    <section className="topbar">
      <div className="flex justify-between items-center py-5 px-4">
        <Link to="/" className="flex items-start">
          <img src="/src/assets/images/logo.svg"></img>
        </Link>
        <div className="flex gap-4">
          <Button variant="ghost" className="shad-button_ghost">
            <img src="/src/assets/icons/logout.svg" onClick={signOut}></img>
          </Button>
          <Link to={`/profie/${user.id}`} className="flex-center">
            <img
              src={user.imageUrl || "/src/assets/icons/profile-placeholder.svg"}
              className="h-8 w-8 rounded-full"
            ></img>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TopBar;
