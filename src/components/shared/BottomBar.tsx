import { bottombarLinks } from "@/constant";
import { Link } from "react-router-dom";

const BottomBar = () => {
  return (
    <section className="bottom-bar">
      {bottombarLinks.map((link) => (
        <Link
          key={link.label}
          to={link.route}
          className="flex-center flex-col gap-1 p-2"
        >
          <img src={link.imgURL}></img>
          <span className="tiny-medium text-light-2">{link.label}</span>
        </Link>
      ))}
    </section>
  );
};

export default BottomBar;
