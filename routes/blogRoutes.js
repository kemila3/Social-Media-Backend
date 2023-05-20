import express from "express";
import {
  addBlog,
  getAllBlogs,
  updateBlog,
  getBlog,
  deleteBlog,
  getUserById
} from "../controllers/blogController";

const blogRouter = express.Router();

blogRouter.get("/", getAllBlogs);
blogRouter.post("/add", addBlog);
blogRouter.put("/update/:id", updateBlog);
blogRouter.get("/:id", getBlog);
blogRouter.delete("/:id", deleteBlog);
blogRouter.get("/user/:id", getUserById )

export default blogRouter;
