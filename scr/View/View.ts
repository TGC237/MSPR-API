import { Response } from 'express';
import { ICommande } from '../Modele/modele';

// Format la réponse pour une liste de commandes
export const renderCommandeList = (res: Response, commandes: ICommande[]) => {
  res.json(commandes.map(commande => ({
    id: commande._id,
    client: commande.client,
    total: commande.total,
    status: commande.status,
    dateCommande: commande.dateCommande,
  })));
};

// Format la réponse pour une seule commande
export const renderCommande = (res: Response, commande: ICommande) => {
  res.json({
    id: commande._id,
    client: commande.client,
    articles: commande.articles,
    total: commande.total,
    status: commande.status,
    dateCommande: commande.dateCommande,
  });
};

// Format la réponse pour une erreur
export const renderError = (res: Response, error: Error, statusCode: number = 400) => {
  res.status(statusCode).json({
    message: error.message,
  });
};
