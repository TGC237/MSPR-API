"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const commande_1 = __importDefault(require("./routes/commande"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/api/commandes', commande_1.default);
const databaseUrl = process.env.MONGODB_URI || 'mongodb+srv://niarisiham:niari@cluster0.eevqfac.mongodb.net/CoffeData?retryWrites=true&w=majority';
mongoose_1.default.connect(databaseUrl)
    .then(() => console.log('Connected to Database'))
    .catch((error) => {
    console.error('Failed to connect to Database:', error);
    process.exit(1);
});
const db = mongoose_1.default.connection;
db.on('error', (error) => console.error('MongoDB connection error:', error));
db.once('open', () => console.log('Database connection is open'));
// Démarrer le serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
exports.default = app;
