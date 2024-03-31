const User = require("../models/userModel");
const { Error } = require("./error");

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');

// create a new account
exports.postSignup = asyncHandler(async (req, res, next) => {
  const { username, password, isAdmin } = req.body;

  if (!username || !password) {
    res.status(400);
    return next(new Error('Please provide all fields', 400));
  }

  const existingUser = await User.findOne({ username }).exec();

  if (existingUser) {
    res.status(400);
    return next(new Error('User already exists', 400));
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    username,
    password: hashedPassword,
    isAdmin: isAdmin || false
  });

  return res.status(201).json({
    success: true,
    user: {
      _id: user._id,
      username: user.username
    }
  });
});

// login
exports.postLogin = asyncHandler(async (req, res, next) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username }).exec();

  if (!user) {
    res.status(400);
    return next(new Error('Username or password is incorrect', 400));
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    res.status(400);
    return next(new Error('Username or password is incorrect', 400));
  }

  const accessToken = jwt.sign(
    {
      user: {
        username: user.username,
        password: user.password,
        _id: user._id,
      },
    },
    process.env.JWT_SECRET,
    { expiresIn: '15d' }
  );

  return res.json({ user, accessToken: `Bearer ${accessToken}` });
});

// get current user
exports.getCurrentUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id).exec();

  if (!user) {
    res.status(404);
    return next(new Error('User not found', 404));
  }

  return res.json(user);
});