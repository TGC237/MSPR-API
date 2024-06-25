var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Commande } from '../models/modele';
export const getAllCommandes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const commandes = yield Commande.find()
            .populate('clientId')
            .populate('articles.produitId');
        res.json(commandes);
    }
    catch (err) {
        res.status(500).json({ message: 'Server error', error: err });
    }
});
export const getCommandeById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const commande = yield Commande.findById(req.params.id)
            .populate('clientId')
            .populate('articles.produitId');
        if (!commande) {
            res.status(404).json({ message: 'Commande non trouvée' });
            return;
        }
        res.json(commande);
    }
    catch (err) {
        res.status(500).json({ message: 'Server error', error: err });
    }
});
export const createCommande = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { clientId, articles, status, total } = req.body;
        if (!clientId || !articles || !total) {
            res.status(400).json({ message: 'Client ID, articles, and total are required' });
            return;
        }
        const nouvelleCommande = new Commande({
            clientId,
            articles,
            status: status || 'en_attente',
            dateCommande: new Date(),
            total
        });
        yield nouvelleCommande.save();
        res.status(201).json(nouvelleCommande);
    }
    catch (err) {
        res.status(400).json({ message: 'Error creating new commande', error: err });
    }
});
export const updateCommande = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedCommande = yield Commande.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedCommande) {
            res.status(404).json({ message: 'Commande non trouvée' });
            return;
        }
        res.json(updatedCommande);
    }
    catch (err) {
        res.status(400).json({ message: 'Error updating commande', error: err });
    }
});
export const deleteCommande = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield Commande.findByIdAndDelete(req.params.id);
        if (!result) {
            res.status(404).json({ message: 'Commande non trouvée' });
            return;
        }
        res.status(200).json({ message: 'Commande supprimée avec succès' });
    }
    catch (err) {
        res.status(500).json({ message: 'Error deleting commande', error: err });
    }
});
