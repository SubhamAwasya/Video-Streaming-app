import dotenv from "dotenv";
import app from "./app.js";
import { connectDB } from "./db/db_connect.js";
dotenv.config({
  path: "./.env",
});

const PORT = process.env.PORT || 9000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is listning on port = ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
  });
