# Plateforme Parking

Une application moderne de gestion de parking construite avec React, Vite, Tailwind CSS et Supabase.

## Fonctionnalités

- ✅ Inscription des utilisateurs avec génération d'ID unique
- 🔍 Recherche d'utilisateurs par ID
- 💳 Système de paiement avec différents modes
- 👨‍💼 Interface d'administration protégée
- 📱 Design responsive avec Tailwind CSS
- 🗄️ Base de données Supabase avec fallback local

## Technologies utilisées

- **Frontend**: React 19, Vite, Tailwind CSS
- **Backend**: Supabase (PostgreSQL)
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

3. Configuration Supabase
   - Créer un projet sur [Supabase](https://supabase.com)
   - Copier `.env.example` vers `.env`
   - Remplir les variables d'environnement Supabase

4. Créer la table users dans Supabase
```sql
CREATE TABLE users (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  car_plate TEXT NOT NULL,
  paid BOOLEAN DEFAULT FALSE,
  payment_method TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Create policy for public access (à adapter selon vos besoins de sécurité)
CREATE POLICY "Allow all operations" ON users FOR ALL USING (true);
```

5. Lancer l'application
```bash
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
│   └── supabase.js     # Configuration et services Supabase
├── data/              # Données par défaut
│   └── users.js       # Utilisateurs de test
└── App.jsx            # Composant principal
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

## Configuration de la base de données

L'application utilise Supabase comme base de données principale avec un fallback sur le localStorage en cas de problème de connexion.

### Schema de la table `users`
- `id`: Identifiant unique (TEXT)
- `name`: Nom de l'utilisateur (TEXT)
- `car_plate`: Matricule du véhicule (TEXT)
- `paid`: Statut de paiement (BOOLEAN)
- `payment_method`: Mode de paiement (TEXT, nullable)
- `created_at`: Date de création (TIMESTAMP)

## Sécurité

- Interface d'administration protégée par mot de passe
- Validation des données côté client et serveur
- Gestion des erreurs avec fallback local
- Row Level Security (RLS) sur Supabase

## Développement

```bash
# Lancer en mode développement
npm run dev

# Build pour la production
npm run build

# Prévisualiser le build
npm run preview

# Linter
npm run lint
```

## Déploiement

L'application peut être déployée sur n'importe quelle plateforme supportant les applications React statiques (Netlify, Vercel, etc.).

N'oubliez pas de configurer les variables d'environnement sur votre plateforme de déploiement.