import mongoose, { Schema } from 'mongoose';
const articleSchema = new Schema({
    produitId: { type: Schema.Types.ObjectId, ref: 'Products', required: true },
    quantite: { type: Number, required: true, default: 1 },
    price: { type: Number, required: true }
});
const commandeSchema = new Schema({
    clientId: { type: Schema.Types.ObjectId, ref: 'Customer', required: true },
    articles: { type: [articleSchema], required: true },
    status: {
        type: String,
        required: true,
        enum: ['en_attente', 'en_preparation', 'prete', 'livree'],
        default: 'en_attente'
    },
    dateCommande: { type: Date, default: Date.now },
    total: { type: Number, required: true }
}, {
    collection: 'orders'
});
const Commande = mongoose.model('Commande', commandeSchema);
export { Commande };
