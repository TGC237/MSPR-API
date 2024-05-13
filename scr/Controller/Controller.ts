import { Request, Response } from 'express';
import { Commande, ICommande } from '../Modele/modele';


// Obtenir toutes les commandes
const getAllCommandes = async (req: Request, res: Response) => {
  try {
    const commandes = await Commande.find();
    res.json(commandes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Obtenir une seule commande par ID
const getCommandeById = async (req: Request, res: Response) => {
  try {
    const commande = await Commande.findById(req.params.id);
    if (commande == null) {
      return res.status(404).json({ message: 'Commande non trouvée' });
    }
    res.json(commande);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Créer une nouvelle commande
const createCommande = async (req: Request, res: Response) => {
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
    res.status(400).json({ message: err.message });
  }
};

// Mettre à jour une commande
const updateCommande = async (req: Request, res: Response) => {
  try {
    const commande = await Commande.findById(req.params.id);
    if (commande == null) {
      return res.status(404).json({ message: 'Commande non trouvée' });
    }

    if (req.body.client) {
      commande.client = req.body.client;
    }
    if (req.body.articles) {
      commande.articles = req.body.articles;
    }
    if (req.body.status) {
      commande.status = req.body.status;
    }
    if (req.body.dateCommande) {
      commande.dateCommande = req.body.dateCommande;
    }
    if (req.body.total) {
      commande.total = req.body.total;
    }

    const commandeMiseAJour = await commande.save();
    res.json(commandeMiseAJour);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Supprimer une commande
const deleteCommande = async (req: Request, res: Response) => {
    try {
      const result = await Commande.findByIdAndDelete(req.params.id);
      if (!result) {
        return res.status(404).json({ message: 'Commande non trouvée' });
      }
      res.json({ message: 'Commande supprimée' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  
export { getAllCommandes, getCommandeById, createCommande, updateCommande, deleteCommande };
