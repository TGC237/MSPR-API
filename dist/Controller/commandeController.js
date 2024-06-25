"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCommande = exports.updateCommande = exports.createCommande = exports.getCommandeById = exports.getAllCommandes = void 0;
const modele_1 = require("../models/modele");
const getAllCommandes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('Attempting to fetch all commandes...');
        const commandes = yield modele_1.Commande.find();
        console.log('Commandes fetched successfully:', commandes);
        res.json(commandes);
    }
    catch (err) {
        console.error('Error fetching commandes:', err);
        res.status(500).json({ message: 'Server error', error: err });
    }
});
exports.getAllCommandes = getAllCommandes;
const getCommandeById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(`Attempting to fetch commande with id ${req.params.id}...`);
        const commande = yield modele_1.Commande.findById(req.params.id);
        if (!commande) {
            console.log('Commande not found');
            res.status(404).json({ message: 'Commande non trouvée' });
            return;
        }
        console.log('Commande fetched successfully:', commande);
        res.json(commande);
    }
    catch (err) {
        console.error('Error fetching commande:', err);
        res.status(500).json({ message: 'Server error', error: err });
    }
});
exports.getCommandeById = getCommandeById;
const createCommande = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { clientId, articles, status, total } = req.body;
        console.log('Creating new commande with data:', req.body);
        if (!clientId || !articles || !total) {
            res.status(400).json({ message: 'Client ID, articles, and total are required' });
            return;
        }
        const nouvelleCommande = new modele_1.Commande({
            clientId,
            articles,
            status: status || 'en_attente',
            dateCommande: new Date(),
            total
        });
        yield nouvelleCommande.save();
        console.log('New commande created successfully:', nouvelleCommande);
        res.status(201).json(nouvelleCommande);
    }
    catch (err) {
        console.error('Error creating new commande:', err);
        res.status(400).json({ message: 'Error creating new commande', error: err });
    }
});
exports.createCommande = createCommande;
const updateCommande = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(`Updating commande with id ${req.params.id} with data:`, req.body);
        const updatedCommande = yield modele_1.Commande.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedCommande) {
            console.log('Commande not found');
            res.status(404).json({ message: 'Commande non trouvée' });
            return;
        }
        console.log('Commande updated successfully:', updatedCommande);
        res.json(updatedCommande);
    }
    catch (err) {
        console.error('Error updating commande:', err);
        res.status(400).json({ message: 'Error updating commande', error: err });
    }
});
exports.updateCommande = updateCommande;
const deleteCommande = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(`Deleting commande with id ${req.params.id}...`);
        const result = yield modele_1.Commande.findByIdAndDelete(req.params.id);
        if (!result) {
            console.log('Commande not found');
            res.status(404).json({ message: 'Commande non trouvée' });
            return;
        }
        console.log('Commande deleted successfully');
        res.status(200).json({ message: 'Commande supprimée avec succès' });
    }
    catch (err) {
        console.error('Error deleting commande:', err);
        res.status(500).json({ message: 'Error deleting commande', error: err });
    }
});
exports.deleteCommande = deleteCommande;
