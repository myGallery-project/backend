const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = new Schema({
  senderEmail: {
    type: String,
    // required: true
  },
  senderName: {
    type: String,
    // required: true
  },
  img: {
    type: String,
    required: true
  },
  likes: {
    type: Number,
    default: 0 // Default value for likes set to 0
  },
  comments: [
    {
      commenterName: String,
      comment: String
    }
  ]
});

const Images = mongoose.model('Images', UserSchema);
module.exports = Images;
