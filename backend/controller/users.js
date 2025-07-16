const Users = require("../model/users");
const bcrypt = require("bcryptjs");

const saltRounds = 10;

const signupUser = async (req, res) => {
  try {
    const userData = req.body;
    const plainPass = userData.password;

    // find the user with email
    // if user exists, send error that eamil in use
    // else create the user

    // generate salt for hashing
    const salt = bcrypt.genSaltSync(10);

    const hashedPass = bcrypt.hashSync(plainPass, salt);

    const result = await Users.create({
      ...userData,
      password: hashedPass,
    });

    if (result) {
      res.status(201).json({
        error: false,
        message: "User signup successful!",
      });
    } else {
      res.status(400).json({
        error: true,
        message: "Error in signup!",
      });
    }
  } catch (error) {
    res.status(400).json({
      error: true,
      message: error.message ? error.message : "Error in signup",
    });
  }
};

const loginUser = async (req, res) => {
  try {
    // req.body --> email and passwrd
    const { email, password } = req.body;
    // find method on user db
    const user = await Users.findOne({ email });
    if (user) {
      // if user exists, return user with status 200
      return res.status(200).json({
        error: false,
        message: "Login successful",
      });
    } else {
      // else return error
      return res.status(400).json({
        error: true,
        message: "Error in login!",
      });
    }
  } catch (error) {
    return res
      .status(500)
      .send({ error: true, message: error.message ?? "Server error" });
  }
};

module.exports = {
  signupUser,
  loginUser,
};
