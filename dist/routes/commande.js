"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const commandeController_1 = require("../Controller/commandeController");
const router = express_1.default.Router();
router.get('/', (req, res) => {
    console.log('GET /api/commandes');
    (0, commandeController_1.getAllCommandes)(req, res);
});
router.get('/:id', (req, res) => {
    console.log(`GET /api/commandes/${req.params.id}`);
    (0, commandeController_1.getCommandeById)(req, res);
});
router.post('/', (req, res) => {
    console.log('POST /api/commandes');
    (0, commandeController_1.createCommande)(req, res);
});
router.put('/:id', (req, res) => {
    console.log(`PUT /api/commandes/${req.params.id}`);
    (0, commandeController_1.updateCommande)(req, res);
});
router.delete('/:id', (req, res) => {
    console.log(`DELETE /api/commandes/${req.params.id}`);
    (0, commandeController_1.deleteCommande)(req, res);
});
exports.default = router;
