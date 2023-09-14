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
const Message = require('./model/message');
const {request} = require('http');

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

const hashPassword = async password => {
  try {
    // Generate a salt
    const salt = await bcrypt.genSalt(10); // You can adjust the salt rounds as needed
    console.log('Generated Salt:', salt);

    // Hash the password using the generated salt
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  } catch (error) {
    throw error; // Handle the error as needed (e.g., log it or return an error response)
  }
};

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
    if (!password) {
      return res.status(400).json({error: 'Password is required'});
    }
    // Hash the user's password
    const hashedPassword = await hashPassword(password);

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

//endpoints for registration of the user

// app.post('/register', async (req, res) => {
//   try {
//     const {
//       name,
//       email,
//       password,
//       phoneNumber,
//       dateOfBirth,
//       role,
//       skills,
//       languages,
//       yearsOfExperience,
//     } = req.body;
//     // Check if user with the same email exists
//     const existingUser = await User.findOne({email});
//     if (existingUser) {
//       return res.status(400).json({error: 'Email address already in use'});
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);
//     // Create new user if email is not in use
//     const newUser = new User({
//       name,
//       email,
//       password: hashedPassword,
//       phoneNumber,
//       dateOfBirth,
//       role,
//       skills,
//       languages,
//       yearsOfExperience,
//     });

//     newUser.verificationToken = crypto.randomBytes(20).toString('hex');
//     const savedUser = await newUser.save();
//     sendVerificationEmail(newUser.email, newUser.verificationToken);
//     res
//       .status(201)
//       .json({message: 'User registered successfully', user: savedUser});
//   } catch (error) {
//     console.error('Error:', error);

//     // Send meaningful error response
//     res.status(500).json({error: error.message});
//   }
// });

//function to create token based on userID

const createToken = userId => {
  // Set token payload
  const payload = {
    userId: userId,
  };

  // Generate the token with secret key and expiration time
  const token = jwt.sign(payload, secretKey); // Pass the secretKey as the second argument

  return token;
};
//endpoint for logging in of user
app.post('/login', async (req, res) => {
  try {
    const {email, password} = req.body;
    console.log(req.body);
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

// app.post('/login', async (req, res) => {
//   try {
//     const {email, password} = req.body;
//     const user = await User.findOne({email});

//     if (!user) {
//       return res.status(401).json({message: 'Invalid username or password'});
//     }

//     const isPasswordValid = await bcrypt.compare(password, user.password);

//     if (!isPasswordValid) {
//       return res.status(401).json({message: 'Invalid password'});
//     }

//     const token = jwt.sign({userId: user._id}, secretKey); // Replace with your secret key
//     res.status(200).json({token, userId: user._id, role: user.role});
//   } catch (err) {
//     res.status(500).json({message: 'Login failed'});
//   }
// });

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

//endpoints to send request

app.post('/request', async (req, res) => {
  const {currentId, selectedUserId} = req.body;
  console.log(currentId, selectedUserId);
  try {
    //update the the receipent's request array
    await User.findByIdAndUpdate(selectedUserId, {
      $push: {recievedRequest: currentId},
    });
    //update sender's sent request array
    await User.findByIdAndUpdate(currentId, {
      $push: {sentRequest: selectedUserId},
    });
    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(500);
  }
});

//endpoint for chatList of particular user

app.get('/chatList/:userId', async (req, res) => {
  try {
    const {userId} = req.params;
    console.log(userId);
    //fetch the user document based on userId
    const user = await User.findById(userId)
      .populate('recievedRequest', 'name')
      .lean();

    console.log(user);
    const chatRequest = user.recievedRequest;

    res.json(chatRequest);
  } catch (error) {
    console.log('Error', error);
    res.status(500).json({message: 'Internal server error'});
  }
});

//endpoints to accept the request of a partcular person

app.post('/chatRequest/accept', async (req, res) => {
  try {
    const {senderId, recipientId} = req.body;

    // Retrieve the documents of sender and recipient
    const sender = await User.findById(senderId);
    const recipient = await User.findById(recipientId);

    // Check if sender and recipient exist
    if (!sender || !recipient) {
      return res.status(404).json({message: 'User not found'});
    }

    // Update the friends array for both sender and recipient
    sender.friends.push(recipientId);
    recipient.friends.push(senderId);

    // Remove the friend request entries
    recipient.recievedRequest = recipient.recievedRequest.filter(
      request => request.toString() !== senderId.toString(),
    );

    sender.sentRequest = sender.sentRequest.filter(
      request => request.toString() !== recipientId.toString(),
    );

    // Save the changes to the database
    await sender.save();
    await recipient.save();

    res.status(200).json({message: 'Friend request accepted successfully'});
  } catch (err) {
    console.log(err);
    res.status(500).json({message: 'Server Error'});
  }
});

//endpoints to access all the friends of the loggedin users

app.get('/acceptedChatList/:userId', async (req, res) => {
  try {
    const {userId} = req.params;

    const user = await User.findById(userId).populate('friends', 'name');

    const acceptedChat = user.friends;
    res.json(acceptedChat);
  } catch (error) {
    console.log(error);
    res.status(500).json({message: 'internal Server Error'});
  }
});

//endpoint to post msgs and store in backend

app.post('/messages', async (req, res) => {
  try {
    const {senderId, recipientId, messageType, messageText} = req.body;

    const newMessage = new Message({
      senderId,
      recipientId,
      messageType,
      message: messageText,
      timeStamp: new Date(),
    });

    await newMessage.save();
    res.status(200).json({message: 'Message Sent successfully'});
  } catch (error) {
    console.log(error);
    res.status(500).json({error: 'Internal server error'});
  }
});

//endpoint to get userDetails for chat room header

app.get('/user/:userId', async (req, res) => {
  try {
    const {userId} = req.params;
    // Fetch the user data from the database using User.findById
    const recipientId = await User.findById(userId);
    if (!recipientId) {
      return res.status(404).json({error: 'User not found'});
    }
    res.json(recipientId);
  } catch (error) {
    console.error('Error in fetching user data:', error);
    res.status(500).json({error: 'Internal server error'});
  }
});

//endpoint to fetch the msgs between two users in chatroom

app.get('/messages/:senderId/:recipientId', async (req, res) => {
  try {
    const {senderId, recipientId} = req.params;

    const messages = await Message.find({
      $or: [
        {senderId: senderId, recipientId: recipientId},
        {senderId: recipientId, recipientId: senderId},
      ],
    }).populate('senderId', '_id name');

    res.json(messages);
  } catch (error) {
    console.log(error);
    res.status(500).json({error: 'Internal server error'});
  }
});

//end point to delete the msgs

app.post('/deleteMessages', async (req, res) => {
  try {
    const {messages} = req.body;
    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({message: 'Invalid req body'});
    }

    await Message.deleteMany({_id: {$in: messages}});
    res.json({message: 'messages deleted successfully'});
  } catch (error) {
    console.log(error);
    res.status(500).json({message: 'Server error'});
  }
});



//