const express = require('express');
const router = express.Router();
const Images = require('../Models/Images');
const path = require('path');

router.get('/getImages' , async (req, res) => {

  try {
    const allImages = await Images.find({});
    res.json(allImages);
    // res.json(Images);
    } catch (error) {
      console.error('Error fetching files:', error);
      res.status(500).json({ error: 'An error occurred while fetching files' });
    }
  });

router.get('/upload/:fileName', (req, res) => {
  const fileName = req.params.fileName;
  const filePath = path.join(__dirname, '../uploads/', fileName); // Adjust the path as per your 
  res.sendFile(filePath);
});

module.exports = router;