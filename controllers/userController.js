import User from "../model/userModel";
import bcrypt from "bcryptjs";

//GET method to get all the users
export const getAllUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find();
  } catch (err) {
    // res.status(200)
    console.log(err);
  }
  if (!users) {
    return res.status(404).json({ message: "No users found" });
  }
  return res.status(200).json({ users });
};

// signup a new user using POST method
export const signup = async (req, res, next) => {
  const { name, email, password } = req.body;

  let exisitngUser;
  try {
    exisitngUser = await User.findOne({ email });
  } catch (err) {
    return console.log(err);
  }
  if (exisitngUser) {
    return res
      .status(400)
      .json({ message: "User already exists..Login instead!" });
  }
  const hashedPassword = bcrypt.hashSync(password);
  const user = new User({
    name,
    email,
    password: hashedPassword,
  });

  try {
    await user.save();
  } catch (err) {
    console.log(err);
  }
  return res.status(201).json({ user });
};

// POST login
export const login = async (req, res, next) => {
  const { email, password } = req.body;
  let exisitngUser;
  try {
    exisitngUser = await User.findOne({ email });
  } catch (err) {
    console.log(err);
  }
  if (!exisitngUser) {
    return res
      .status(404)
      .json({ message: "Couldn't find user by this email!" });
  }

  const isPasswordCorrect = bcrypt.compareSync(password, exisitngUser.password)
  if(!isPasswordCorrect){
    return res.status(400).json({message: "Incorrect password"})
  }
  return res.status(200).json({message: "Login Successful"})
};
