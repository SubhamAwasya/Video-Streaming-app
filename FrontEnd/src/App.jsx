import { useState, useEffect } from "react";
import SignUp from "./views/SignUp.jsx";
import NavBar from "./components/NavBar.jsx";
import VideosPage from "./views/VideosPage.jsx";
import Login from "./views/Login.jsx";
import UploadVideo from "./views/UploadVideo.jsx";
import VideoPlayer from "./views/VideoPlayer.jsx";

function App() {
  const pages = [
    "Home",
    "Explore",
    "Trending",
    "Music",
    "Subscribed",
    "Upload",
    "Login",
    "Signup",
  ];
  const icons = [
    "Home",
    "Explore",
    "Trending_Up",
    "Headphones",
    "Subscriptions",
    "Upload",
    "Login",
    "Person_Add",
  ];
  const [Page, setPage] = useState("Signup");
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

  function whatToDisplayOnContentPage() {
    switch (Page) {
      case "Signup":
        return <SignUp prop={{ Page, setPage }} />;
      case "Login":
        return <Login prop={{ Page, setPage }} />;
      case "Home":
        return <VideosPage prop={{ Page, setPage }} />;
      case "Explore":
        return "Explore";
      case "Trending":
        return "Trending";
      case "Music":
        return "Music";
      case "Subscribed":
        return "Subscribed";
      case "VideoPlayer":
        return <VideoPlayer />;
      case "Upload":
        return <UploadVideo />;
      default:
        return "404";
    }
  }
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
          className={`bg-neutral-950 w-52 z-50 h-screen p-4 fixed ${isSideBarOpen}`}
        >
          <div>
            {pages.map((pageName, i, Names) => {
              return (
                <div key={i}>
                  <div
                    className="flex items-center hover:bg-neutral-800 rounded-lg p-1 pl-4 cursor-pointer"
                    onClick={() => {
                      toggleSideBar();
                      setPage(pageName);
                    }}
                  >
                    <span className="material-symbols-outlined mr-2">
                      {icons[i]}
                    </span>
                    {pageName}
                  </div>
                  {i == 3 || i == 4 ? (
                    <hr key={i + 100} className="my-2"></hr>
                  ) : (
                    ""
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/*Sidebar-------------------------------------------*/}
        {/*Content Page ///////////////////////////////////////////*/}

        <div
          className={`${leftMarginForContentPage} w-full mx-auto justify-center flex items-center`}
        >
          {whatToDisplayOnContentPage()}
        </div>

        {/*Content Page -------------------------------------------*/}
      </div>
    </>
  );
}

export default App;
