import express from "express";
import mongoose from "mongoose";
import router from "./routes/userRoutes";

const app = express();
app.use(express.json())

app.use("/api/user", router);
mongoose
  .connect(
    "mongodb+srv://admin:admin@cluster0.rs4hnjp.mongodb.net/Blog?retryWrites=true&w=majority"
  )
  .then(() => app.listen(5000))
  .then(() => console.log("MongoDB is connected!"))
  .catch((err) => console.log(err));

