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
    console.log('Fetching all commandes');
    try {
        const commandes = yield modele_1.Commande.find();
        res.json(commandes);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});
exports.getAllCommandes = getAllCommandes;
const getCommandeById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`Fetching commande with id ${req.params.id}`);
    try {
        const commande = yield modele_1.Commande.findById(req.params.id);
        if (!commande) {
            return res.status(404).json({ message: 'Commande non trouvée' });
        }
        res.json(commande);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});
exports.getCommandeById = getCommandeById;
const createCommande = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Creating new commande');
    const commande = new modele_1.Commande({
        client: req.body.client,
        articles: req.body.articles,
        status: req.body.status,
        dateCommande: req.body.dateCommande,
        total: req.body.total
    });
    try {
        const nouvelleCommande = yield commande.save();
        res.status(201).json(nouvelleCommande);
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
});
exports.createCommande = createCommande;
const updateCommande = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`Updating commande with id ${req.params.id}`);
    try {
        const commande = yield modele_1.Commande.findById(req.params.id);
        if (!commande) {
            return res.status(404).json({ message: 'Commande non trouvée' });
        }
        if (req.body.client)
            commande.client = req.body.client;
        if (req.body.articles)
            commande.articles = req.body.articles;
        if (req.body.status)
            commande.status = req.body.status;
        if (req.body.dateCommande)
            commande.dateCommande = req.body.dateCommande;
        if (req.body.total)
            commande.total = req.body.total;
        const commandeMiseAJour = yield commande.save();
        res.json(commandeMiseAJour);
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
});
exports.updateCommande = updateCommande;
const deleteCommande = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`Deleting commande with id ${req.params.id}`);
    try {
        const result = yield modele_1.Commande.findByIdAndDelete(req.params.id);
        if (!result) {
            return res.status(404).json({ message: 'Commande non trouvée' });
        }
        res.json({ message: 'Commande supprimée' });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});
exports.deleteCommande = deleteCommande;
