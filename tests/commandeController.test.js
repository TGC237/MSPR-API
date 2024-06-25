"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const chai_1 = require("chai");
const mongoose_1 = __importDefault(require("mongoose"));
const server_1 = __importDefault(require("../src/server")); // Ensure the path is correct
// Configuration de test de Mongoose
before((done) => {
    mongoose_1.default.connect('mongodb+srv://niarisiham:niari@cluster0.eevqfac.mongodb.net/CoffeData?retryWrites=true&w=majority')
        .then(() => {
        console.log('Test database connected');
        done();
    })
        .catch((error) => {
        console.error('connection error:', error);
        done(error);
    });
});
after((done) => {
    mongoose_1.default.connection.db.dropDatabase()
        .then(() => mongoose_1.default.connection.close())
        .then(() => done())
        .catch((error) => {
        console.error('error during disconnection:', error);
        done(error);
    });
});
describe('Commande Routes', () => {
    it('should create a new commande', (done) => {
        (0, supertest_1.default)(server_1.default)
            .post('/api/commandes')
            .send({
            clientId: new mongoose_1.default.Types.ObjectId(),
            articles: [{ produitId: new mongoose_1.default.Types.ObjectId(), quantite: 2 }],
            status: 'en_attente',
            total: 200
        })
            .expect(201)
            .end((err, res) => {
            if (err)
                return done(err);
            (0, chai_1.expect)(res.body).to.have.property('_id');
            done();
        });
    });
    it('should get all commandes', (done) => {
        (0, supertest_1.default)(server_1.default)
            .get('/api/commandes')
            .expect(200)
            .end((err, res) => {
            if (err)
                return done(err);
            (0, chai_1.expect)(res.body).to.be.an('array');
            done();
        });
    });
    // Ajoutez d'autres tests pour les autres routes
});
