import { Avatar } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { useSpring, animated } from "react-spring";
import { StoreInterface, UserInterface } from "../../redux/reducers";
import Logo from "../logo/Logo";

const Navbar = ({ className = "", ...props }) => {
  const [hamOpen, setHamOpen] = useState(false);
  const user: UserInterface = useSelector((s: StoreInterface) => s.user);
  const hamSpring = useSpring({
    from: {
      right: "-100rem",
      opacity: 0,
    },
    to: {
      right: hamOpen ? "1.5rem" : "-100rem",
      opacity: hamOpen ? 1 : 0,
    },
    duration: 500,
    config: {
      mass: 1,
      tension: 300,
      friction: 30,
    },
    easing: "easeInOut",
  });
  const { pathname } = window.location;
  return (
    <nav
      {...props}
      className={
        `fixed select-none bg-secondary backdrop-blur-[1.5px] ${
          pathname !== "/" ? "bg-opacity-90" : "bg-opacity-100"
        } bg-opacity-90 z-30 top-0 left-0 flex px-6 md:px-10 w-full h-12 py-8 justify-between items-center duration-300 ` +
        className
      }
    >
      <Logo />
      {user.auth ? (
        <div className="rounded-full nm-flat-secondary-lg">
          <Avatar src={user.displayPicture} />
        </div>
      ) : (
        <>
          <div className="md:flex hidden md:justify-between items-center gap-1 md:gap-2">
            <NavLink
              className={(isActive) =>
                isActive ? "text-white" : "rounded-md hidden sm:block"
              }
              to="/about"
            >
              <div className="hover:text-white px-3 font-extralight md:px-6 py-1 hover:border-primary border border-secondary border-opacity-0 text-xl duration-300 rounded-md">
                About
              </div>
            </NavLink>
            <NavLink
              className={(isActive) =>
                isActive ? "text-white" : "rounded-md hidden sm:block"
              }
              to="/mission"
            >
              <div className="hover:text-white px-3 font-extralight md:px-6 py-1 hover:border-primary border border-secondary border-opacity-0 text-xl duration-300 rounded-md">
                Mission
              </div>
            </NavLink>
            <NavLink
              className={(isActive) =>
                isActive ? "text-white" : "rounded-md hidden sm:block"
              }
              to="/contact"
            >
              <div className="hover:text-white px-3 font-extralight md:px-6 py-1 hover:border-primary border border-secondary border-opacity-0 text-xl duration-300 rounded-md">
                Contact
              </div>
            </NavLink>
            <div className="pl-4">
              <Link className={`rounded-full`} to="/signup">
                <div className="px-3 md:px-6 text-yellow py-1 font-semibold text-xl duration-300 rounded-full nm-convex-secondary hover:nm-concave-secondary-sm">
                  Sign Up
                </div>
              </Link>
            </div>
          </div>
          <div
            className="flex items-end justify-center md:hidden"
            onClick={() => setHamOpen(!hamOpen)}
          >
            <div className="h-full cursor-pointer rounded-md p-1 flex flex-col gap-2">
              <div className="w-10 border-white nm-flat-secondary rounded-full">
                <div className="w-full bg-white h-1 rounded-full"></div>
              </div>
              <div className="w-10 border-white nm-flat-secondary rounded-full">
                <div className="w-full bg-white h-1 rounded-full"></div>
              </div>
              <div className="w-10 border-white nm-flat-secondary rounded-full">
                <div className="w-full bg-white h-1 rounded-full"></div>
              </div>
            </div>
          </div>
          <div
            onClick={() => setHamOpen((ho) => !ho)}
            className={`w-screen h-screen bg-black bg-opacity-5 top-0 left-0 ${
              hamOpen ? "fixed" : "hidden"
            }`}
          />
          <animated.div
            style={hamSpring}
            className={`${
              hamOpen ? "block" : "hidden"
            } top-12 rounded-md z-10 p-3 flex gap-2 flex-col bg-white fixed md:hidden`}
            onClick={() => setHamOpen(!hamOpen)}
          >
            <NavLink
              className={(isActive) =>
                isActive ? "text-primary" : "rounded-md hidden sm:block"
              }
              to="/about"
            >
              <div className="hover:text-white px-3 font-extralight md:px-6 py-1 hover:bg-primary text-xl duration-300 rounded-md">
                About
              </div>
            </NavLink>
            <NavLink
              className={(isActive) =>
                isActive ? "text-primary" : "rounded-md hidden sm:block"
              }
              to="/mission"
            >
              <div className="hover:text-white px-3 font-extralight md:px-6 py-1 hover:bg-primary text-xl duration-300 rounded-md">
                Mission
              </div>
            </NavLink>
            <NavLink
              className={(isActive) =>
                isActive ? "text-primary" : "rounded-md hidden sm:block"
              }
              to="/contact"
            >
              <div className="hover:text-white px-3 font-extralight md:px-6 py-1 hover:bg-primary text-xl duration-300 rounded-md">
                Contact
              </div>
            </NavLink>
          </animated.div>
        </>
      )}
    </nav>
  );
};

export default Navbar;
