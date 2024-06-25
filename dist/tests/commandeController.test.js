import request from 'supertest';
import { expect } from 'chai';
import mongoose from 'mongoose';
import app from '../src/server';
// Configuration de test de Mongoose
before((done) => {
    mongoose.connect('mongodb+srv://niarisiham:niari@cluster0.eevqfac.mongodb.net/CoffeDataTest?retryWrites=true&w=majority')
        .then(() => {
        console.log('Test database connected');
        done();
    })
        .catch((error) => {
        console.error('Connection error:', error);
        done(error);
    });
});
after((done) => {
    mongoose.connection.db.dropDatabase()
        .then(() => mongoose.connection.close())
        .then(() => done())
        .catch((error) => {
        console.error('Error during disconnection:', error);
        done(error);
    });
});
describe('Commande Routes', () => {
    it('should create a new commande', (done) => {
        request(app)
            .post('/api/commandes')
            .send({
            clientId: new mongoose.Types.ObjectId(),
            articles: [{ produitId: new mongoose.Types.ObjectId(), quantite: 2, price: 100 }],
            status: 'en_attente',
            total: 200
        })
            .expect(201)
            .end((err, res) => {
            if (err)
                return done(err);
            expect(res.body).to.have.property('_id');
            done();
        });
    });
    it('should get all commandes', (done) => {
        request(app)
            .get('/api/commandes')
            .expect(200)
            .end((err, res) => {
            if (err)
                return done(err);
            expect(res.body).to.be.an('array');
            done();
        });
    });
    // Ajoutez d'autres tests pour les autres routes
});
