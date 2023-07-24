const express = require('express');
const router = express.Router();
const Album = require('../Models/Albums'); // Replace with the actual path to your Mongoose Album model
const Images = require('../Models/Images');
const authMiddleware = require('../Middleware/authMiddleware');
const User = require('../Models/User');



// Route to add an image to selected albums
router.post('/addToAlbums/:imageId', authMiddleware , async (req, res) => {
  const userId = req.user;
  const user = await User.findOne({ _id: userId });
  const { email } = user;


  try {
    const imageId = req.params.imageId;

    const { albums } = req.body;
   
    // Find the image by ID in your MongoDB collection
    const image = await Images.findById(imageId);
    if (!image) {
      return res.status(404).json({ error: 'Image not found' });
    }
    const allAlbums = await Album.findOne({email});
    

    allAlbums.albums.forEach(async (album) => {
      if (albums.includes(album._id.toString())) {
        album.images.push(image);
        await allAlbums.save(); // Save the modified allAlbums object
      }
    });
    
  
    res.status(200).json({ message: 'Image added to selected albums successfully' });
  } catch (error) {
    console.error('Error adding image to albums:', error);
    res.status(500).json({ error: 'An error occurred while adding image to albums' });
  }
});

// Add the router to your app
module.exports = router;
