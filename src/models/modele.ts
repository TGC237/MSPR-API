import mongoose, { Document, Schema } from 'mongoose';

interface IArticle {
  nomDuCafe: string;
  variete: string;
  taille: 'petit' | 'moyen' | 'grand';
  prix: number;
  quantite: number;
}

interface IClient {
  nom: string;
  prenom: string;
  email: string;
  adresse: string;
}

interface ICommande extends Document {
  client: IClient;
  articles: IArticle[];
  status: 'en_attente' | 'en_preparation' | 'prete' | 'livree';
  dateCommande: Date;
  total: number;
}

const articleSchema = new Schema<IArticle>({
  nomDuCafe: { type: String, required: true },
  variete: { type: String, required: true },
  taille: { type: String, required: true, enum: ['petit', 'moyen', 'grand'] },
  prix: { type: Number, required: true },
  quantite: { type: Number, required: true, default: 1, min: 1 }
});

const clientSchema = new Schema<IClient>({
  nom: { type: String, required: true },
  prenom: { type: String, required: true },
  email: { type: String, required: true },
  adresse: { type: String, required: true }
});

const commandeSchema = new Schema<ICommande>({
  client: { type: clientSchema, required: true },
  articles: { type: [articleSchema], required: true },
  status: {
    type: String,
    required: true,
    enum: ['en_attente', 'en_preparation', 'prete', 'livree'],
    default: 'en_attente'
  },
  dateCommande: { type: Date, default: Date.now },
  total: { type: Number, required: true }
}, {
  collection: 'orders'
});

const Commande = mongoose.model<ICommande>('Commande', commandeSchema);

export { Commande, ICommande, IClient, IArticle };
