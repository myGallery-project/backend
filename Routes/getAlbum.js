const express = require('express');
const router = express.Router();
const Album = require('../Models/Albums');
const User = require('../Models/User');
const authMiddleware = require('../Middleware/authMiddleware');

router.get('/getAlbum/:email/:albumId', authMiddleware, async (req, res) => {

  
  const albumId = req.params.albumId;

  const userId = req.user;
  const user = await User.findOne({ _id: userId });
  const { email } = user;
 
  
  try {

    const user = await Album.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Find the album with the specified _id in the user's albums array
    
    const album = user.albums.find((album) => album._id.toString() === albumId);
    if (!album) {
      return res.status(404).json({ error: 'Album not found' });
    }

    res.status(200).json({ album });
  } catch (error) {
    console.error('Error fetching album:', error);
    res.status(500).json({ error: 'An error occurred while fetching album' });
  }
});

module.exports = router;
