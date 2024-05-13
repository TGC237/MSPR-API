require('dotenv').config()

import express from 'express';
import mongoose from 'mongoose';
import { json } from 'body-parser';
import commandeRoutes from './routes/commandeRoutes';

const app = express();

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to Database'));

// Middlewares
app.use(express.json())

// Routes
app.use('/commandes', commandeRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server Started on port ${PORT}`));




