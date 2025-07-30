# Plateforme Parking

Une application moderne de gestion de parking construite avec React, Vite, Tailwind CSS, Node.js/Express et MongoDB.
## Fonctionnalités

- ✅ Inscription des utilisateurs avec génération d'ID unique
- 🔍 Recherche d'utilisateurs par ID
- 💳 Système de paiement avec différents modes
- 👨‍💼 Interface d'administration protégée
- 📱 Design responsive avec Tailwind CSS
- 🗄️ Base de données Supabase avec fallback local

## Technologies utilisées

- **Frontend**: React 19, Vite, Tailwind CSS
- **Backend**: Node.js, Express.js, MongoDB
- **Routing**: React Router DOM
- **Styling**: Tailwind CSS
- **ID Generation**: UUID

## Installation

1. Cloner le projet
```bash
git clone <repository-url>
cd parking-platform
```

2. Installer les dépendances
```bash
npm install
```

3. Configuration MongoDB
   - Remplacer `<db_password>` dans le fichier `.env` par votre mot de passe MongoDB
   - Votre URI MongoDB est déjà configurée

4. Lancer l'application complète (frontend + backend)
```bash
npm run dev:full
```

Ou séparément :
```bash
# Terminal 1 - Backend
npm run server

# Terminal 2 - Frontend  
npm run dev
```

## Structure du projet

```
src/
├── components/          # Composants React
│   ├── UserForm.jsx    # Formulaire de recherche
│   ├── UserInfo.jsx    # Affichage des infos utilisateur
│   ├── UserList.jsx    # Liste des utilisateurs (admin)
│   ├── SignupForm.jsx  # Formulaire d'inscription
│   └── Payment.jsx     # Composant de paiement
├── services/           # Services API  
│   └── api.js          # Service API pour MongoDB
├── data/              # Données par défaut
│   └── users.js       # Utilisateurs de test
├── App.jsx            # Composant principal
└── server/            # Backend Node.js
    ├── models/        # Modèles MongoDB
    ├── routes/        # Routes API
    └── server.js      # Serveur Express
```

## Utilisation

### Pour les utilisateurs
1. **Inscription**: Remplir le formulaire avec nom et matricule
2. **Connexion**: Utiliser l'ID généré lors de l'inscription
3. **Paiement**: Choisir le mode de paiement et valider

### Pour les administrateurs
1. **Connexion admin**: Mot de passe par défaut `admin`
2. **Gestion**: Voir, ajouter, modifier et supprimer des utilisateurs
3. **Suivi**: Visualiser les statuts de paiement

## Configuration MongoDB

L'application utilise MongoDB comme base de données principale avec un fallback sur le localStorage en cas de problème de connexion.

### Schema de la collection `users`
- `id`: Identifiant unique (String)
- `name`: Nom de l'utilisateur (String)
- `carPlate`: Matricule du véhicule (String)
- `paid`: Statut de paiement (Boolean)
- `paymentMethod`: Mode de paiement (String, nullable)
- `createdAt`: Date de création (Date)
- `updatedAt`: Date de modification (Date)

## Sécurité

- Interface d'administration protégée par mot de passe
- Validation des données côté client et serveur
- Gestion des erreurs avec fallback local
- API REST sécurisée avec Express.js

## Développement

```bash
# Lancer frontend + backend
npm run dev:full

# Lancer en mode développement
npm run dev

# Lancer seulement le backend
npm run server

# Build pour la production
npm run build

# Prévisualiser le build
npm run preview

# Linter
npm run lint
```

## Déploiement

L'application peut être déployée sur :
- **Frontend**: Netlify, Vercel, etc.
- **Backend**: Heroku, Railway, DigitalOcean, etc.

N'oubliez pas de configurer les variables d'environnement sur vos plateformes de déploiement.