import express from "express";
import { getAllBlogs } from "../controllers/blogController";

const blogRouter = express.Router();

router.get("/", getAllBlogs);

export default blogRouter;