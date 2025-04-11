 import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import PharmacyRouter from './routes/pharmacy.routes.js';
import inventoryRoutes from './routes/inventory.routes.js';
import onboardingRoutes from './routes/onboard.routes.js';

dotenv.config();
import mongoose from 'mongoose';

const app = express();
const PORT = process.env.PORT || 8000;

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.error('MongoDB connection error:', err));

// Middl
app.use(cors());
app.use(express.json());

// Base Route (Optional)
app.get('/', (req, res) => {
  res.send('Welcome to the Pharmacy Backend');
});

// API Routes
app.use('/api/pharmacy', PharmacyRouter);
app.use('/api/inventory', inventoryRoutes);
app.use('/api/onboard', onboardingRoutes);

// Connect to MongoDB and start the server
mongoose 
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });
