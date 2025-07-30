const express = require('express');
const User = require('../models/User');
const router = express.Router();

// Récupérer tous les utilisateurs
router.get('/', async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    console.error('Erreur lors de la récupération des utilisateurs:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// Créer un nouvel utilisateur
router.post('/', async (req, res) => {
  try {
    const { id, name, carPlate, paid, paymentMethod } = req.body;
    
    // Vérifier si l'utilisateur existe déjà
    const existingUser = await User.findOne({ id });
    if (existingUser) {
      return res.status(400).json({ error: 'Un utilisateur avec cet ID existe déjà' });
    }

    const user = new User({
      id,
      name,
      carPlate,
      paid: paid || false,
      paymentMethod: paymentMethod || null
    });

    const savedUser = await user.save();
    res.status(201).json(savedUser);
  } catch (error) {
    console.error('Erreur lors de la création de l\'utilisateur:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// Trouver un utilisateur par ID
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findOne({ id: req.params.id });
    if (!user) {
      return res.status(404).json({ error: 'Utilisateur non trouvé' });
    }
    res.json(user);
  } catch (error) {
    console.error('Erreur lors de la recherche de l\'utilisateur:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// Mettre à jour un utilisateur
router.put('/:id', async (req, res) => {
  try {
    const { name, carPlate, paid, paymentMethod } = req.body;
    
    const updatedUser = await User.findOneAndUpdate(
      { id: req.params.id },
      { 
        ...(name && { name }),
        ...(carPlate && { carPlate }),
        ...(paid !== undefined && { paid }),
        ...(paymentMethod && { paymentMethod })
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: 'Utilisateur non trouvé' });
    }

    res.json(updatedUser);
  } catch (error) {
    console.error('Erreur lors de la mise à jour de l\'utilisateur:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// Supprimer un utilisateur
router.delete('/:id', async (req, res) => {
  try {
    const deletedUser = await User.findOneAndDelete({ id: req.params.id });
    
    if (!deletedUser) {
      return res.status(404).json({ error: 'Utilisateur non trouvé' });
    }

    res.json({ message: 'Utilisateur supprimé avec succès' });
  } catch (error) {
    console.error('Erreur lors de la suppression de l\'utilisateur:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

module.exports = router;