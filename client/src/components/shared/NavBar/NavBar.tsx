import React from "react";
import Theme from "./Theme";
import MobileNav from "./MobileNav";
import GlobalSearch from "../search/GlobalSearch";
import { Link } from "react-router-dom";
import SignedIn from "../../auth/SignedIn";

const NavBar = () => {
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
      <GlobalSearch />
      <div className="flex-between gap-5">
        <Theme />
        <SignedIn>
          <img
            src="/assets/icons/avatar.svg"
            alt="avatar"
            width={23}
            height={23}
          />
        </SignedIn>
        <MobileNav />
      </div>
    </nav>
  );
};

export default NavBar;
