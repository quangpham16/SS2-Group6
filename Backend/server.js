const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

const registerRoute = require('./routes/auth/register');
const loginRoute = require('./routes/auth/login');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/', (_req, res) => {
  res.send('Backend is running');
});

app.get('/api/status', (_req, res) => {
  res.json({ message: 'API is ready' });
});

app.use('/api/auth/register', registerRoute);
app.use('/api/auth/login', loginRoute);

async function startServer() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');

    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1);
  }
}

startServer();
