import express from "express";
import router from "./routes/routes.js";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use(express.static("public"));
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

app.get("/", (req, res) => {
  res.send("Server is running");
});
app.use("/api/users", router);

export default app;
