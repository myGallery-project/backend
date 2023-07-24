const express = require('express');
const router = express.Router();
const Album = require('../Models/Albums');
const User = require('../Models/User')
const authMiddleware = require('../Middleware/authMiddleware');

// Get albums by user email
router.get('/getAlbums/:email', authMiddleware, async (req, res) => {
    const userId = req.user;
    const user = await User.findOne({ _id: userId });
    const { email } = user;
  
  try {
    // const {email} = req.body;

    // console.log(email);

    // Find the user by email and populate the 'albums' field to get all albums associated with the user
    const user = await Album.findOne({ email }).populate('albums');

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ albums: user.albums });
  } catch (err) {
    console.error('Error fetching albums:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});



  

 
module.exports = router;
