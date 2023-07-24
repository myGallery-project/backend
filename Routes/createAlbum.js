// Assuming you have already set up the necessary imports and configurations for the backend

const express = require('express');
const router = express.Router();
const Album = require('../Models/Albums');
const User = require('../Models/User')
const authMiddleware = require('../Middleware/authMiddleware');

router.post('/createAlbum', authMiddleware, async (req, res) => {
  const userId = req.user;
  const user = await User.findOne({ _id: userId });
  const { email } = user;

  try {
    const { albumName } = req.body;

    // Check if the user with the given email already exists in the database
    let user = await Album.findOne({ email });

    if (!user) {
      // If user does not exist, create a new user with the album
      user = new Album({
        email,
        albums: [{ name: albumName }],
      });
    } else {
      // If user exists, check if the album with the same name already exists
      const existingAlbum = user.albums.find((album) => album.name === albumName);
      if (existingAlbum) {
        return res.status(400).json({ error: 'Album with the same name already exists for this user' });
      }

      // Add the new album to the existing user's albums array
      user.albums.push({ name: albumName });
    }

    // Save the user with the new album to the database
    const savedUser = await user.save();

    res.status(201).json(savedUser);
  } catch (err) {
    console.error('Error creating album:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
