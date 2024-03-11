import { useState, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import NavBar from "./components/NavBar.jsx";
import { icons, pages, routes } from "./PagesData.js";

function App() {
  const [isSideBarOpen, setisSideBarOpen] = useState("");
  const [leftMarginForContentPage, setleftMarginForContentPage] =
    useState("ml-52");

  function toggleSideBar() {
    if (window.innerWidth > 1200) {
      setisSideBarOpen("");
      setleftMarginForContentPage("ml-52");
    } else {
      setisSideBarOpen("hidden");
      setleftMarginForContentPage("");
    }
  }
  useEffect(() => {
    toggleSideBar();
  }, []);
  //Side bar hide and show by window resize
  window.addEventListener("resize", function () {
    toggleSideBar();
  });

  return (
    <>
      {/*Navbar///////////////////////////////////////////*/}
      <NavBar
        isSideBarOpen={isSideBarOpen}
        setisSideBarOpen={setisSideBarOpen}
        setleftMarginForContentPage={setleftMarginForContentPage}
      />
      {/*Navbar-------------------------------------------*/}
      <div className="flex">
        {/*Sidebar///////////////////////////////////////////*/}
        <div
          className={`bg-neutral-950 w-52 z-50 h-screen mt-14 p-4 fixed ${isSideBarOpen}`}
        >
          {pages.map((pageName, i, Names) => {
            return (
              <Link to={routes[i]} key={i}>
                <div
                  className="flex items-center hover:bg-neutral-800 rounded-lg p-1 pl-4 cursor-pointer"
                  onClick={() => {
                    toggleSideBar();
                    pageName;
                  }}
                >
                  <span className="material-symbols-outlined mr-2">
                    {icons[i]}
                  </span>
                  {pageName}
                </div>
                {i == 2 || i == 4 ? (
                  <hr key={i + 100} className="my-2"></hr>
                ) : (
                  ""
                )}
              </Link>
            );
          })}
        </div>

        {/*Sidebar-------------------------------------------*/}
        {/*Content Page ///////////////////////////////////////////*/}

        <div
          className={`${leftMarginForContentPage} w-full mx-auto justify-center mt-14 flex items-center`}
        >
          {<Outlet />}
        </div>

        {/*Content Page -------------------------------------------*/}
      </div>
    </>
  );
}

export default App;
