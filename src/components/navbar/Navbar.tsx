import { Avatar, Button, Menu, MenuItem, Popover } from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { useSpring, animated } from "react-spring";
import { StoreInterface, UserInterface } from "../../redux/reducers";
import Logo from "../logo/Logo";

const Navbar = ({ className = "", ...props }) => {
  const [hamOpen, setHamOpen] = useState(false);
  const user: UserInterface = useSelector((s: StoreInterface) => s.user);
  const { pathname } = window.location;
  // ham popover
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // menu for auth===true
  const [anchorEl2, setAnchorEl2] = React.useState<null | HTMLElement>(null);
  const open2 = Boolean(anchorEl2);
  const handleClick2 = (event: any) => {
    setAnchorEl2(event.currentTarget);
  };
  const handleClose2 = () => {
    setAnchorEl2(null);
  };
  return (
    <nav
      {...props}
      className={
        `fixed select-none bg-secondary backdrop-blur-[1.5px] ${
          pathname !== "/" ? "bg-opacity-90" : "bg-opacity-100"
        } bg-opacity-90 z-30 top-0 left-0 flex px-6 md:px-10 w-screen h-12 py-8 justify-between items-center duration-300 ` +
        className
      }
    >
      <Logo />
      {user.auth ? (
        <div>
          <div
            id="basic-button"
            aria-controls={open2 ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open2 ? "true" : undefined}
            onClick={handleClick2}
            className="rounded-full w-10 h-10 nm-flat-secondary-lg"
          >
            <Avatar
              className="transform scale-105 -translate-y-1"
              src={user.avatar}
            />
          </div>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl2}
            open={open2}
            onClose={handleClose2}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
            className="fixed right-20"
          >
            <MenuItem onClick={handleClose2}>
              <NavLink
                className={(isActive) =>
                  isActive ? "text-primary" : "rounded-md hidden sm:block"
                }
                to="/dashboard"
              >
                <div className="text-primary px-3 font-light text-lg">
                  Dashboard
                </div>
              </NavLink>
            </MenuItem>
            <MenuItem onClick={handleClose2}>
              <Button className="w-full" color="error">
                Log Out
              </Button>
            </MenuItem>
          </Menu>
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
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
            className="flex items-end justify-center md:hidden"
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
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
            className="mt-4"
          >
            <MenuItem onClick={handleClose}>
              <NavLink
                className={(isActive) =>
                  isActive ? "text-primary" : "rounded-md hidden sm:block"
                }
                to="/about"
              >
                <div className="text-primary px-3 font-light text-lg">
                  About
                </div>
              </NavLink>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <NavLink
                className={(isActive) =>
                  isActive ? "text-primary" : "rounded-md hidden sm:block"
                }
                to="/mission"
              >
                <div className="text-primary px-3 font-light text-lg">
                  Mission
                </div>
              </NavLink>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <NavLink
                className={(isActive) =>
                  isActive ? "text-primary" : "rounded-md hidden sm:block"
                }
                to="/contact"
              >
                <div className="text-primary px-3 font-light text-lg">
                  Contact
                </div>
              </NavLink>
            </MenuItem>
          </Menu>
        </>
      )}
    </nav>
  );
};

export default Navbar;
