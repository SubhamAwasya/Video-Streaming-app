import React from "react";
import ReactDOM from "react-dom/client";
import { Link, RouterProvider, createBrowserRouter } from "react-router-dom";
import "./main.css";
import App from "./App.jsx";
import HomePage from "./views/HomePage.jsx";
import Login from "./views/Login.jsx";
import SignUp from "./views/SignUp.jsx";
import UploadVideo from "./views/UploadVideo.jsx";
import VideoPlayer from "./views/VideoPlayer.jsx";
import Error404 from "./views/Error404.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error404 />,
    children: [
      { path: "", element: <HomePage /> },
      { path: "search/:query", element: <HomePage /> },
      { path: "login", element: <Login /> },
      { path: "signup", element: <SignUp /> },
      { path: "upload", element: <UploadVideo /> },
      { path: "video/:id", element: <VideoPlayer /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
