import { TopBar, LeftSideBar, BottomBar } from "@/components/shared";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <div className="w-full h-screen flex flex-col md:flex-row">
      <TopBar></TopBar>
      <LeftSideBar></LeftSideBar>
      <section className="flex flex-1">
        <Outlet></Outlet>
      </section>
      <BottomBar></BottomBar>
    </div>
  );
};

export default RootLayout;
