import Blog from "../model/blogModel";

const getAllBlogs = async (req, res, next) => {
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
