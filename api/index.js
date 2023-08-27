const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const passport = require('passport'); //authentication middleware
const LocalStrategy = require('passport-local').LocalStrategy;
const jwt = require('jsonwebtoken');
const cors = require('cors');

const PORT = 2020;
const app = express();

//middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(passport.initialize());

app.listen(PORT, () => {
  console.log(`Server runnig at ${PORT}`);
});

mongoose
  .connect('mongodb+srv://root:root@cluster0.bnkx1c7.mongodb.net/', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(err => {
    console.log('Error connecting to MongoDB: ', err);
  });
const User = require('./model/db');

//function to send verification email to user
const sendVerificationEmail = async (email, verificationToken) => {
  //create a nodemailer transport
  const transporter = nodemailer.createTransport({
    //configure email service
    service: 'gmail',
    auth: {
      user: 'swapnilbhushan2010@gmail.com',
      pass: 'sbcctpzqoijaiiwu',
    },
  });

  //compose the email message
  const mailOptions = {
    from: 'Astrotalk.com',
    to: email,
    subject: 'Email Verification',
    text: `Please Cick the following link to verify your email : http://localhost:2020/verify/${verificationToken}`,
  };

  //send the email
  try {
    await transporter.sendMail(mailOptions);
  } catch (err) {
    console.log('error sending email', err);
  }
};

//endpoints for registration of the user

app.post('/register', async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      phoneNumber,
      dateOfBirth,
      role,
      skills,
      languages,
      yearsOfExperience,
    } = req.body;
    // Check if user with the same email exists
    const existingUser = await User.findOne({email});
    if (existingUser) {
      return res.status(400).json({error: 'Email address already in use'});
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    // Create new user if email is not in use
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      phoneNumber,
      dateOfBirth,
      role,
      skills,
      languages,
      yearsOfExperience,
    });

    newUser.verificationToken = crypto.randomBytes(20).toString('hex');
    const savedUser = await newUser.save();
    sendVerificationEmail(newUser.email, newUser.verificationToken);
    res
      .status(201)
      .json({message: 'User registered successfully', user: savedUser});
  } catch (error) {
    console.error('Error:', error);

    // Send meaningful error response
    res.status(500).json({error: error.message});
  }
});

//function to create token based on userID

const createToken = userId => {
  //set token payload

  const payload = {
    userId: userId,
  };

  //generate the token with secret key and expiration time

  const token = jwt.sign(payload);
};

//endpoint for logging in of user

app.post('/login', async (req, res) => {
  try {
    const {email, password} = req.body;
    const user = await User.findOne({email});

    if (!user) {
      return res.status(401).json({message: 'Invalid username or password'});
    }

    // Compare hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({message: 'Invalid password'});
    }

    const token = jwt.sign({userId: user._id}, secretKey);
    // Send the userId along with the token in the response
    res.status(200).json({token, userId: user._id, role: user.role});

    console.log(res.json);
  } catch (err) {
    res.status(500).json({message: 'Login failed'});
  }
});

app.get('/verify/:token', async (req, res) => {
  try {
    const token = req.params.token;

    //find the user with the given verification token
    const user = await User.findOne({verificationToken: token});
    if (!user) {
      return res.status(404).json({message: 'User not found'});
    }
    //mark the user as verified

    user.verified = true;
    user.verificationToken = undefined;

    await user.save();
    res.status(200).json({message: 'Email Verified Successfully'});
  } catch (err) {
    res.status(500).json({message: 'Email Verification Failed'});
  }
});

/**
 *
 *  function to generate secret key
 */
const generateSecretKey = () => {
  const secretKey = crypto.randomBytes(32).toString('hex');
  return secretKey;
};
const secretKey = generateSecretKey();

//endpoint to access users having role as a client

// Route to get astrologer users
app.get('/astrologers', async (req, res) => {
  try {
    // Find users with role "astrologer"
    const astrologerUsers = await User.find({role: 'astrologer'});

    res.status(200).json(astrologerUsers);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({error: 'Internal server error'});
  }
});

//Route to get client Users

app.get('/client', async (req, res) => {
  try {
    // Find users with role "astrologer"
    const clientUsers = await User.find({role: 'client'});

    res.status(200).json(clientUsers);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({error: 'Internal server error'});
  }
});
