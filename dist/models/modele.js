"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Commande = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const articleSchema = new mongoose_1.Schema({
    nomDuCafe: { type: String, required: true },
    variete: { type: String, required: true },
    taille: { type: String, required: true, enum: ['petit', 'moyen', 'grand'] },
    prix: { type: Number, required: true },
    quantite: { type: Number, required: true, default: 1, min: 1 }
});
const clientSchema = new mongoose_1.Schema({
    nom: { type: String, required: true },
    prenom: { type: String, required: true },
    email: { type: String, required: true },
    adresse: { type: String, required: true }
});
const commandeSchema = new mongoose_1.Schema({
    client: { type: clientSchema, required: true },
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
const Commande = mongoose_1.default.model('Commande', commandeSchema);
exports.Commande = Commande;
