const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
const { default: mongoose } = require('mongoose');
dotenv.config();

const path = require('path');

if (process.env.NODE_ENV === 'local') {
  app.use(
    cors({
      origin: 'http://localhost:5001',
      credentials: true,
    })
  );
} else {
  app.use(
    cors({
      credentials: true,
    })
  );
}

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, './frontend/dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '/', 'frontend', 'dist', 'index.html'));
  });
}

const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Production Database ola kala...');
  } catch (error) {
    console.log(error);
  }
};

dbConnect();

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server trexei sta port ${PORT}...`));
