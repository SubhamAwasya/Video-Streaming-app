import React from "react";

const NavBar = ({
  isSideBarOpen,
  setisSideBarOpen,
  setleftMarginForContentPage,
}) => {
  return (
    <>
      <nav className="flex w-full justify-between items-center h-14 sticky top-0 z-50 bg-neutral-950">
        <div className="flex items-center">
          <button
            className="w-12 h-8 m-2 text-2xl flex rounded-lg items-center border-2 border-transparent hover:border-gray-50"
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
            <span className="material-symbols-outlined mx-auto">menu</span>
          </button>
          <h1 className="text-2xl max-md:hidden cursor-pointer">VideoApp</h1>
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
