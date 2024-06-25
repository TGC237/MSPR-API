import { Request, Response } from 'express';
import { Commande } from '../models/modele';

export const getAllCommandes = async (req: Request, res: Response): Promise<void> => {
    try {
        console.log('Attempting to fetch all commandes...');
        const commandes = await Commande.find();
        console.log('Commandes fetched successfully:', commandes);
        res.json(commandes);
    } catch (err) {
        console.error('Error fetching commandes:', err);
        res.status(500).json({ message: 'Server error', error: err });
    }
};

export const getCommandeById = async (req: Request, res: Response): Promise<void> => {
    try {
        console.log(`Attempting to fetch commande with id ${req.params.id}...`);
        const commande = await Commande.findById(req.params.id);
        if (!commande) {
            console.log('Commande not found');
            res.status(404).json({ message: 'Commande non trouvée' });
            return;
        }
        console.log('Commande fetched successfully:', commande);
        res.json(commande);
    } catch (err) {
        console.error('Error fetching commande:', err);
        res.status(500).json({ message: 'Server error', error: err });
    }
};

export const createCommande = async (req: Request, res: Response): Promise<void> => {
    try {
        const { clientId, articles, status, total } = req.body;
        console.log('Creating new commande with data:', req.body);

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

        await nouvelleCommande.save();
        console.log('New commande created successfully:', nouvelleCommande);
        res.status(201).json(nouvelleCommande);
    } catch (err) {
        console.error('Error creating new commande:', err);
        res.status(400).json({ message: 'Error creating new commande', error: err });
    }
};

export const updateCommande = async (req: Request, res: Response): Promise<void> => {
    try {
        console.log(`Updating commande with id ${req.params.id} with data:`, req.body);
        const updatedCommande = await Commande.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedCommande) {
            console.log('Commande not found');
            res.status(404).json({ message: 'Commande non trouvée' });
            return;
        }
        console.log('Commande updated successfully:', updatedCommande);
        res.json(updatedCommande);
    } catch (err) {
        console.error('Error updating commande:', err);
        res.status(400).json({ message: 'Error updating commande', error: err });
    }
};

export const deleteCommande = async (req: Request, res: Response): Promise<void> => {
    try {
        console.log(`Deleting commande with id ${req.params.id}...`);
        const result = await Commande.findByIdAndDelete(req.params.id);
        if (!result) {
            console.log('Commande not found');
            res.status(404).json({ message: 'Commande non trouvée' });
            return;
        }
        console.log('Commande deleted successfully');
        res.status(200).json({ message: 'Commande supprimée avec succès' });
    } catch (err) {
        console.error('Error deleting commande:', err);
        res.status(500).json({ message: 'Error deleting commande', error: err });
    }
};
