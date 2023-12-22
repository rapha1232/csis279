import React from "react";
import { Link } from "react-router-dom";
import { sidebarLinks } from "../../../constants";
import LogoutDialog from "../../LogoutDialog";
import SignedIn from "../../auth/SignedIn";
import SignedOut from "../../auth/SignedOut";
import { Button } from "../../ui/button";

/**
 * LeftSideBar component represents the left sidebar of the application.
 * It includes navigation links, login/logout buttons, and a logout dialog.
 *
 * @returns {JSX.Element} The JSX for the LeftSideBar component.
 */
const LeftSideBar = () => {
  const pathname = window.location.href;
  return (
    <section className="background-light900_dark200 custom-scrollbar light-border sticky left-0 top-0 flex h-screen flex-col justify-between overflow-y-auto border-r p-6 pt-36 shadow-light-300 dark:shadow-none max-sm:hidden lg:w-[266px]">
      <div className="flex flex-1 flex-col gap-6">
        {sidebarLinks.map((link) => {
          const isActive =
            (pathname.includes(link.route) && link.route.length > 1) ||
            pathname === link.route;
          return (
            <Link
              key={link.route}
              to={link.route}
              className={`${
                isActive
                  ? "primary-gradient rounded-lg text-light-900"
                  : "text-dark300_light900"
              }
            flex items-center justify-start gap-4 bg-transparent p-4 `}
            >
              <img
                src={link.imgURL}
                alt={link.label}
                width={20}
                height={20}
                className={`${isActive ? "" : "invert-colors"}`}
              />
              <p
                className={`${
                  isActive ? "base-bold" : "base-medium"
                } max-lg:hidden`}
              >
                {link.label}
              </p>
            </Link>
          );
        })}
      </div>
      <SignedOut>
        <div className="flex flex-col gap-3">
          <Link to="/sign-in">
            <Button className="small-medium btn-secondary min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none">
              <img
                src="/assets/icons/account.svg"
                alt="Log In"
                width={20}
                height={20}
                className="invert-colors lg:hidden"
              />
              <span className="primary-text-gradient max-lg:hidden">
                Log In
              </span>
            </Button>
          </Link>
          <Link to="/sign-up">
            <Button className="small-medium light-border-2 btn-tertiary text-dark400_light900 min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none">
              <img
                src="/assets/icons/sign-up.svg"
                alt="Log In"
                width={20}
                height={20}
                className="invert-colors lg:hidden"
              />
              <span className="primary-text-gradient max-lg:hidden">
                Sign Up
              </span>
            </Button>
          </Link>
        </div>
      </SignedOut>
      <SignedIn>
        <LogoutDialog />
      </SignedIn>
    </section>
  );
};

export default LeftSideBar;
