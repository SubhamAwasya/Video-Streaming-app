import React from "react";
import { Link } from "react-router-dom";

const NavBar = ({
  isSideBarOpen,
  setisSideBarOpen,
  setleftMarginForContentPage,
}) => {
  return (
    <>
      <nav className="flex w-full justify-between items-center h-14 fixed top-0 z-50 bg-neutral-950">
        <div className="flex items-center">
          <button
            className="w-12 h-8 m-2 text-2xl flex rounded-lg items-center border-2 border-transparent hover:border-red-600"
            onClick={() => {
              if (isSideBarOpen && window.innerWidth > 1000) {
                setisSideBarOpen("");
                setleftMarginForContentPage("ml-52");
              } else if (isSideBarOpen) {
                setisSideBarOpen("");
              } else {
                setisSideBarOpen("hidden ");
                setleftMarginForContentPage("");
              }
            }}
          >
            <span className="material-symbols-outlined mx-auto text-red-600">
              menu
            </span>
          </button>
          <Link
            to={"/"}
            className="text-2xl font-bold max-md:hidden cursor-pointer"
          >
            VideoApp
          </Link>
        </div>
        <div>
          <input
            className="w-96 p-1 pl-4 rounded-full max-lg:w-60 bg-neutral-900"
            placeholder="Search Videos"
          ></input>
        </div>
        <div className="flex items-center max-lg:w-auto">
          <img className="w-8 m-1 rounded-full" src="DefaultProfile.png"></img>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
