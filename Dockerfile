# Utiliser une image de base officielle pour Node.js
FROM node:16

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier les fichiers package.json et package-lock.json dans le répertoire de travail
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste de l'application dans le répertoire de travail
COPY . .

# Compiler les fichiers TypeScript
RUN npm run build

# Exposer le port de l'application
EXPOSE 3000

# Démarrer l'application
CMD ["npm", "start"]
