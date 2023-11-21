import { User2 } from "lucide-react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import SignedIn from "../../auth/SignedIn";
import MobileNav from "./MobileNav";
import Theme from "./Theme";

const NavBar = () => {
  const navigate = useNavigate();
  return (
    <nav className="flex-between background-light900_dark200 fixed z-50 w-full gap-5 p-6 shadow-light-300 dark:shadow-none sm:px-12">
      <Link to="/" className="flex items-center gap-1">
        <img
          src="/assets/images/site-logo.svg"
          width={40}
          height={40}
          alt="DevFlow"
        ></img>
        <p className="h2-bold font-spaceGrotesk text-dark-100 dark:text-light-900 max-sm:hidden">
          Star <span className="text-primary-500">Club</span>
        </p>
      </Link>
      <div className="flex-between gap-5">
        <Theme />
        <SignedIn>
          <User2
            width={23}
            height={23}
            onClick={() => {
              navigate("/profile");
            }}
            className="cursor-pointer text-dark100_light900 hover:!text-primary-500 "
          />
        </SignedIn>
        <MobileNav />
      </div>
    </nav>
  );
};

export default NavBar;
