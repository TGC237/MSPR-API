"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderError = exports.renderCommande = exports.renderCommandeList = void 0;
// Format la réponse pour une liste de commandes
const renderCommandeList = (res, commandes) => {
    res.json(commandes.map(commande => ({
        id: commande._id,
        client: commande.client,
        total: commande.total,
        status: commande.status,
        dateCommande: commande.dateCommande,
    })));
};
exports.renderCommandeList = renderCommandeList;
// Format la réponse pour une seule commande
const renderCommande = (res, commande) => {
    res.json({
        id: commande._id,
        client: commande.client,
        articles: commande.articles,
        total: commande.total,
        status: commande.status,
        dateCommande: commande.dateCommande,
    });
};
exports.renderCommande = renderCommande;
// Format la réponse pour une erreur
const renderError = (res, error, statusCode = 400) => {
    res.status(statusCode).json({
        message: error.message,
    });
};
exports.renderError = renderError;
