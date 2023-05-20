import express from "express";
import {
  addBlog,
  getAllBlogs,
  updateBlog,
  getBlog,
} from "../controllers/blogController";

const blogRouter = express.Router();

blogRouter.get("/", getAllBlogs);
blogRouter.post("/add", addBlog);
blogRouter.put("/update/:id", updateBlog);
blogRouter.get("/:id", getBlog);

export default blogRouter;
