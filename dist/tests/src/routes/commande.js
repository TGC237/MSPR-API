import express from 'express';
import { getAllCommandes, getCommandeById, createCommande, updateCommande, deleteCommande } from '../Controller/commandeController';
const router = express.Router();
router.get('/', (req, res) => {
    console.log('GET /api/commandes');
    getAllCommandes(req, res);
});
router.get('/:id', (req, res) => {
    console.log(`GET /api/commandes/${req.params.id}`);
    getCommandeById(req, res);
});
router.post('/', (req, res) => {
    console.log('POST /api/commandes');
    createCommande(req, res);
});
router.put('/:id', (req, res) => {
    console.log(`PUT /api/commandes/${req.params.id}`);
    updateCommande(req, res);
});
router.delete('/:id', (req, res) => {
    console.log(`DELETE /api/commandes/${req.params.id}`);
    deleteCommande(req, res);
});
export default router;
