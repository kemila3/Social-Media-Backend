import Blog from "../model/blogModel";

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
  const blog = new Blog({
    title,
    description,
    images,
    user,
  });
  try {
    await blog.save();
  } catch (err) {
    return console.log(err);
  }
  res.status(200).json({ blog });
};

// PUT method to update a blog
export const updateBlog = async (req, res, next) => {
  const { title, description } = req.body;
  const blogId = req.params.id;
  let blog;
  try {
    const blog = await Blog.findByIdAndUpdate(blogId, {
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
