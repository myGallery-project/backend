const mongoose = require('mongoose');

const { Schema } = mongoose;

const ImageSchema = new Schema({
  img: {
    type: String,
    // required: true,
  },
  likes: {
    type: Number,
    default: 0,
  },
  comments: [
    {
      commenterName: String,
      comment: String,
    }
  ],
});

const AlbumSchema = new Schema({
  name: {
    type: String,
    // required: true,
  },
  images: [ImageSchema],
});

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true, // Ensure email is unique for each user
  },
  albums: [AlbumSchema],
});

const Album = mongoose.model('Album', UserSchema);
module.exports = Album