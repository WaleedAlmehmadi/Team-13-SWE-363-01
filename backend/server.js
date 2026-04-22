require('dotenv').config();

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const connectDB = require('./config/db');

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(express.json());
app.use(cors());
app.use(helmet());

app.use('/api/auth', require('./routes/auth'));

app.get('/', (_req, res) => {
  res.json({ message: 'SWE Compass API is running' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
