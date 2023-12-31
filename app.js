const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
const path = require('path');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const corsOptions = {
  origin: (origin, callback) => {
    callback(null, true);
  },
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  allowedHeaders: ["Access-Control-Allow-Origin", "Origin", "X-Requested-With", "Content-Type", "Accept", "Authorization"],
  credentials: true
};

app.options('*', cors(corsOptions));
app.use(cors(corsOptions));

// MongoDB connection
const MONGO_URL = 'mongodb+srv://hariompatel:patel786@cluster0.latgxao.mongodb.net/';
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose.connect(MONGO_URL, options)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

// Routes
app.get('/', (req, res) => {
  res.send('Hello World');
});

app.use('/api', require('./Routes/signup'));
app.use('/api', require('./Routes/login'));
app.use('/api', require('./Routes/uploadImage'));
app.use('/api', require('./Routes/getImages'));
app.use('/api', require('./Routes/createAlbum'));
app.use('/api', require('./Routes/getAlbums'));
app.use('/api', require('./Routes/addToAlbums'));
app.use('/api', require('./Routes/getAlbum'));


app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
