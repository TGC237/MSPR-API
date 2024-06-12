import { Request, Response } from 'express';
import { Commande } from '../models/modele';

export const getAllCommandes = async (req: Request, res: Response) => {
  console.log('Fetching all commandes');
  try {
    const commandes = await Commande.find();
    res.json(commandes);
  } catch (err) {
    res.status(500).json({ message: (err as Error).message });
  }
};

export const getCommandeById = async (req: Request, res: Response) => {
  console.log(`Fetching commande with id ${req.params.id}`);
  try {
    const commande = await Commande.findById(req.params.id);
    if (!commande) {
      return res.status(404).json({ message: 'Commande non trouvée' });
    }
    res.json(commande);
  } catch (err) {
    res.status(500).json({ message: (err as Error).message });
  }
};

export const createCommande = async (req: Request, res: Response) => {
  console.log('Creating new commande');
  const commande = new Commande({
    client: req.body.client,
    articles: req.body.articles,
    status: req.body.status,
    dateCommande: req.body.dateCommande,
    total: req.body.total
  });

  try {
    const nouvelleCommande = await commande.save();
    res.status(201).json(nouvelleCommande);
  } catch (err) {
    res.status(400).json({ message: (err as Error).message });
  }
};

export const updateCommande = async (req: Request, res: Response) => {
  console.log(`Updating commande with id ${req.params.id}`);
  try {
    const commande = await Commande.findById(req.params.id);
    if (!commande) {
      return res.status(404).json({ message: 'Commande non trouvée' });
    }

    if (req.body.client) commande.client = req.body.client;
    if (req.body.articles) commande.articles = req.body.articles;
    if (req.body.status) commande.status = req.body.status;
    if (req.body.dateCommande) commande.dateCommande = req.body.dateCommande;
    if (req.body.total) commande.total = req.body.total;

    const commandeMiseAJour = await commande.save();
    res.json(commandeMiseAJour);
  } catch (err) {
    res.status(400).json({ message: (err as Error).message });
  }
};

export const deleteCommande = async (req: Request, res: Response) => {
  console.log(`Deleting commande with id ${req.params.id}`);
  try {
    const result = await Commande.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({ message: 'Commande non trouvée' });
    }
    res.json({ message: 'Commande supprimée' });
  } catch (err) {
    res.status(500).json({ message: (err as Error).message });
  }
};
