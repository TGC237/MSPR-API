import { Request, Response } from 'express';
import { Commande } from '../models/modele';  


export const getAllCommandes = async (req: Request, res: Response): Promise<void> => {
    try {
        const commandes = await Commande.find()
                                       .populate('clientId')
                                       .populate({
                                         path: 'articles.produitId',
                                         model: 'Product'
                                       });
        res.json(commandes);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err });
    }
};


export const getCommandeById = async (req: Request, res: Response): Promise<void> => {
    try {
        const commande = await Commande.findById(req.params.id)
                                       .populate('clientId')
                                       .populate('articles.produitId');
        if (!commande) {
            res.status(404).json({ message: 'Commande non trouvée' });
            return;
        }
        res.json(commande);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err });
    }
};


export const createCommande = async (req: Request, res: Response): Promise<void> => {
    try {
        const { clientId, articles, status, dateCommande, total } = req.body;
        const nouvelleCommande = new Commande({
            clientId,
            articles,
            status,
            dateCommande,
            total
        });
        await nouvelleCommande.save();
        res.status(201).json(nouvelleCommande);
    } catch (err) {
        res.status(400).json({ message: 'Error creating new commande', error: err });
    }
};


export const updateCommande = async (req: Request, res: Response): Promise<void> => {
    try {
        const commande = await Commande.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!commande) {
            res.status(404).json({ message: 'Commande non trouvée' });
            return;
        }
        res.json(commande);
    } catch (err) {
        res.status(400).json({ message: 'Error updating commande', error: err });
    }
};


export const deleteCommande = async (req: Request, res: Response): Promise<void> => {
    try {
        const result = await Commande.findByIdAndDelete(req.params.id);
        if (!result) {
            res.status(404).json({ message: 'Commande non trouvée' });
            return;
        }
        res.status(200).json({ message: 'Commande supprimée avec succès' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting commande', error: err });
    }
};
