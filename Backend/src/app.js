import express from "express";
import router from "./routes/routes.js";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173"); // Replace '*' with the exact origin
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.static("public"));
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Server is running");
});
app.use("/api/users", router);

export default app;
