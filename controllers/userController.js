import User from "../model/userModel";

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
  const user = new User({
    name,
    email,
    password,
  });

  try {
    await user.save();
  } catch (err) {
    console.log(err);
  }
  return res.status(201).json({user})
};
