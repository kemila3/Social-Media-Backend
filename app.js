import express from "express";
import mongoose from "mongoose";
import router from "./routes/userRoutes";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());

app.use("/api/user", router);
mongoose
  .connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => app.listen(5000))
  .then(() => console.log("MongoDB is connected!"))
  .catch((err) => console.log(err));
