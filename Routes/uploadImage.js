const express = require('express');
const router = express.Router();
const multer = require('multer'); // Import Multer
const Images = require('../Models/Images');
const User = require('../Models/User');
const authMiddleware = require('../Middleware/authMiddleware');

// Configure Multer to specify where to store the uploaded files and their names
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Store files in the 'uploads' folder
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname + '-' + Date.now() ); // Append a timestamp to the original filename to make it unique
  },
});

const upload = multer({ storage }); // Create the multer instance

router.post('/uploadImage',authMiddleware, upload.single('file'), async (req, res) => {
  const userId = req.user;
  const user = await User.findOne({ _id: userId });
  const {name , email} = user;
  console.log("user:", user);
  // // console.log("file:", req.file);

  // if (!user) {
  //   return res.status(400).json({ error: 'User not found' });
  // }
  try {
    // Extract data from the request body
    const senderName = name;
    const senderEmail = email;
    
    const { likes, comments } = req.body;
    const img = req.file.filename; // Multer saves the file path in req.file.path
   
    // Create a new instance of the Images model with the extracted data
    const newImage = new Images({
      senderEmail,
      senderName,
      img,
      likes,
      comments
    });

    // Save the new image document to the database
    const savedImage = await newImage.save();

    // Respond with the saved image document as the result
    res.status(201).json(savedImage);
  } catch (err) {
    // Handle errors, e.g., validation errors or database connection issues
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
