const router = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const Token = require("../models/token");
const sendEmail = require("../mailer");
const crypto = require("crypto");

router.post("/find", async (req, res) => {
  try {
    const result = await User.findById(req.body.id);
    if (!result) {
      res.status(404).send("User Doesn't Exist");
      return;
    }
    res.status(200).json(result.username);
  } catch (error) {
    res.status(500).json("Something Went Wrong");
  }
});
router.post("/reset-password", async (req, res) => {
  const { email } = req.body;
  try {
    const result = await User.findOne({ email });
    if (!result) {
      res.status(404).send("User Doesn't Exist");
      return;
    }
    let token = await Token.findOne({ userId: result._id });

    if (!token) {
      token = await new Token({
        userId: result._id,
        token: crypto.randomBytes(32).toString("hex"),
      }).save();
    }
    const link = `https://toprecepty.herokuapp.com/password-reset/${result._id}/${token.token}`;
    await sendEmail(result.email, "Password Reset For Top Recipes", link);
    res.status(200).json({ message: "Check Your E-mail To Reset Password" });
  } catch (error) {
    res.status(500).json("Something Went Wrong");
  }
});

router.post(`/reset-password/:userId/:token`, async (req, res) => {
  const id = req.params.userId;
  try {
    const result = await User.findById(id);
    if (!result) {
      res.status(404).send("User Doesn't Exist");
      return;
    }
    const token = await Token.findOne({
      userId: result._id,
      token: req.params.token,
    });
    if (!token) {
      res.status(404).send("Invalid Link or Expired Token");
      return;
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 12);
    result.password = hashedPassword;
    await result.save();
    await token.delete();
    res.status(200).json("Password Succesfully Changed");
  } catch (error) {
    res.status(500).json("Something Went Wrong");
  }
});

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await User.findOne({ email });
    if (!result) {
      res.status(404).send("User Doesn't Exist");
      return;
    }
    const isPasswordCorrect = await bcrypt.compare(password, result.password);

    if (!isPasswordCorrect) {
      res.status(400).json("Wrong Password");
      return;
    }
    const token = jwt.sign(
      {
        email: result.email,
        id: result._id,
        name: result.name,
      },
      process.env.JWT_PASS,
      { expiresIn: "1h" }
    );

    res.status(200).json({ result, token });
  } catch (error) {
    res.status(500).json("Something went wrong");
  }
});
router.post("/signup", async (req, res) => {
  const { email, password, confirmPassword, firstname, lastname } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json("User Already Exist");
    }
    if (!password || !firstname || !lastname || !email) {
      if (!password) {
        return res.status(400).json("Password is required");
      } else if (!firstname) {
        return res.status(400).json("Username is required");
      } else if (!lastname) {
        return res.status(400).json("Lastname is required");
      } else if (!email) {
        return res.status(400).json("Email is required");
      }
    }
    if (password !== confirmPassword) {
      return res.status(400).json("Passwords Doesn't Match");
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const result = await User.create({
      username: `${firstname} ${lastname}`,
      password: hashedPassword,
      email,
    });
    const token = jwt.sign(
      { email: result.email, id: result._id, name: result.name },
      process.env.JWT_PASS,
      {
        expiresIn: "1h",
      }
    );
    res.status(200).json({ result, token });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
