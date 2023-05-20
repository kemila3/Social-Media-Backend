import mongoose from "mongoose";
import Blog from "../model/blogModel";
import User from "../model/userModel";

// GET method to get all blogs
export const getAllBlogs = async (req, res, next) => {
  let blogs;
  try {
    blogs = await Blog.find();
  } catch (err) {
    console.log(err);
  }
  if (!blogs) {
    res.status(404).json({ message: "No Blogs found!" });
  }
  res.status(200).json({ blogs });
};

// POST method to add a blog
export const addBlog = async (req, res, next) => {
  const { title, description, images, user } = req.body;
  // relationship between user and blogs
  let exisitngUser;
  try {
    exisitngUser = await User.findById(user);
  } catch (err) {
    return console.log(err);
  }
  if (!exisitngUser) {
    return res.status(400).json({ message: "Unable to find user by this ID" });
  }
  const blog = new Blog({
    title,
    description,
    images,
    user,
  });
  try {
    // relationship between user and blogs
    const session = await mongoose.startSession();
    session.startTransaction();
    await blog.save({ session });
    exisitngUser.blogs.push(blog);
    await exisitngUser.save({ session });
    await session.commitTransaction();
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err });
  }
  res.status(200).json({ blog });
};

// PUT method to update a blog
export const updateBlog = async (req, res, next) => {
  const { title, description } = req.body;
  const blogId = req.params.id;
  let blog;
  try {
    blog = await Blog.findByIdAndUpdate(blogId, {
      title,
      description,
    });
  } catch (err) {
    return console.log(err);
  }
  if (!blog) {
    return res.status(500).json({ message: "Unable to update the blog" });
  }
  return res.status(200).json({ blog });
};

// GET method to get a blog
export const getBlog = async (req, res, next) => {
  const id = req.params.id;
  let blog;
  try {
    blog = await Blog.findById(id);
  } catch (err) {
    return console.log(err);
  }
  if (!blog) {
    return res.status(404).json({ message: "Unable to find the blog by id" });
  }
  return res.status(200).json({ blog });
};

//DELETE method to delete a blog
export const deleteBlog = async (req, res, next) => {
  const id = req.params.id;
  let blog;
  try {
    blog = await Blog.findByIdAndRemove(id).populate("user");
    await blog.user.blogs.pull(blog);
    await blog.user.save();
  } catch (err) {
    console.log(err);
  }
  if (!blog) {
    res.status(500).json({ message: "Blog not found to be deleted" });
  }
  res.status(200).json({ message: "Sucessfully Deleted" });
};

export const getUserById = async (req, res, next) => {
  const userId = req.params.id;
  let userBlogs;
  try {
    userBlogs = await User.findById(userId).populate("blogs");
  } catch (err) {
    return console.log(err);
  }
  if(!userBlogs){
    return res.status(404).json({message:"No blog found"})
  }
  return res.status(200).json({blogs: userBlogs})
};
