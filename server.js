import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import StudentRoutes from './routes/StudentRoutes.js';
import LecturerRoutes from './routes/LectuererRoutes.js';
import IssueRoutes from './routes/IssueRoutes.js';

// Load .env variables
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// routes
app.use('/students', StudentRoutes);
app.use('/lecturers', LecturerRoutes);
app.use('/issues', IssueRoutes)

// Define a simple route
app.get('/', (req, res) => {
    res.send('Backend is running');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));