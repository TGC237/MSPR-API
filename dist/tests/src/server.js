import express from 'express';
import mongoose from 'mongoose';
import commandeRoutes from './routes/commande';
const app = express();
app.use(express.json());
app.use('/api/commandes', commandeRoutes);
const databaseUrl = 'mongodb+srv://niarisiham:niari@cluster0.eevqfac.mongodb.net/CoffeData?retryWrites=true&w=majority';
mongoose.connect(databaseUrl)
    .then(() => console.log('Connected to Database'))
    .catch((error) => {
    console.error('Failed to connect to Database:', error);
    process.exit(1);
});
const db = mongoose.connection;
db.on('error', (error) => console.error('MongoDB connection error:', error));
db.once('open', () => console.log('Database connection is open'));
// Démarrer le serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
export default app;
