const asyncHandler = require('express-async-handler');
const User = require('../models/usermodel');
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken');

const registerUser = asyncHandler(async (req, res) => {
  const { userName, email, password } = req.body;
  if (!userName || !email || !password) {
    res.status(400);
    throw new Error('All fields are required');
  }

  const userAvailable = await User.findOne({email});

  if(userAvailable){
    res.status(400);
    throw new Error('Email already taken');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({
    userName,
    email,
    password: hashedPassword,
  });

  await user.save(); // Save the user to the database

  console.log(hashedPassword)
  res.json({message: "Registered user"})

});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error('Email and password are required');
  }

  const user = await User.findOne({ email });

  if (!user) {
    res.status(401);
    throw new Error('Invalid email or password');
  }

  // const isMatch = await bcrypt.compare(password, user.password);

  // if (!isMatch) {
  //   res.status(401);
  //   throw new Error('Invalid email or password');
  // }

  // // Generate JWT token
  // const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
  //   expiresIn: '1h',
  // });

  if(user && (await bcrypt.compare(password, user.password))){
    const accessToken = jwt.sign(
      { 
        user: {
          _id: user._id,
          userName: user.userName,
          email: user.email,
        },
      }, 
      process.env.JWT_SECRET, 
      {
      expiresIn: '1h',
    });
  }else{
    res.status(401);
    throw new Error('Invalid email or password');
  }

  res.json({ 
    message: "Logged in user", 
    user: {
      _id: user._id,
      userName: user.userName,
      email: user.email,
    },
  });

  
  });

module.exports = {
  registerUser,
  loginUser
};



