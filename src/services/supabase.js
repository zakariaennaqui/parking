import { createClient } from '@supabase/supabase-js';

// Configuration Supabase - vous devrez remplacer ces valeurs
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'YOUR_SUPABASE_URL';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'YOUR_SUPABASE_ANON_KEY';

export const supabase = createClient(supabaseUrl, supabaseKey);

// Services pour les utilisateurs
export const userService = {
  // Récupérer tous les utilisateurs
  async getAllUsers() {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Erreur lors de la récupération des utilisateurs:', error);
      return [];
    }
  },

  // Créer un nouvel utilisateur
  async createUser(userData) {
    try {
      const { data, error } = await supabase
        .from('users')
        .insert([{
          id: userData.id,
          name: userData.name,
          car_plate: userData.carPlate,
          paid: userData.paid || false,
          payment_method: userData.paymentMethod || null,
          created_at: new Date().toISOString()
        }])
        .select();
      
      if (error) throw error;
      return data[0];
    } catch (error) {
      console.error('Erreur lors de la création de l\'utilisateur:', error);
      throw error;
    }
  },

  // Trouver un utilisateur par ID
  async getUserById(id) {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error && error.code !== 'PGRST116') throw error;
      return data;
    } catch (error) {
      console.error('Erreur lors de la recherche de l\'utilisateur:', error);
      return null;
    }
  },

  // Mettre à jour un utilisateur
  async updateUser(id, updates) {
    try {
      const updateData = {};
      if (updates.name) updateData.name = updates.name;
      if (updates.carPlate) updateData.car_plate = updates.carPlate;
      if (updates.paid !== undefined) updateData.paid = updates.paid;
      if (updates.paymentMethod) updateData.payment_method = updates.paymentMethod;

      const { data, error } = await supabase
        .from('users')
        .update(updateData)
        .eq('id', id)
        .select();
      
      if (error) throw error;
      return data[0];
    } catch (error) {
      console.error('Erreur lors de la mise à jour de l\'utilisateur:', error);
      throw error;
    }
  },

  // Supprimer un utilisateur
  async deleteUser(id) {
    try {
      const { error } = await supabase
        .from('users')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'utilisateur:', error);
      throw error;
    }
  }
};