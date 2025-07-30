import React, { useState, useEffect } from 'react';
import UserForm from './components/UserForm';
import UserInfo from './components/UserInfo';
import Payment from './components/Payment';
import UserList from './components/UserList';
import SignupForm from './components/SignupForm';
import { userService } from './services/supabase';
import defaultUsers from './data/users';

function App() {
  const [user, setUser] = useState(null);
  const [adminPassword, setAdminPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [usersData, setUsersData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newUser, setNewUser] = useState({
    id: '',
    name: '',
    carPlate: '',
    paid: false,
  });

  // Charger les utilisateurs au démarrage
  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const users = await userService.getAllUsers();
      
      // Si aucun utilisateur en base, utiliser les données par défaut
      if (users.length === 0) {
        // Convertir les données par défaut au format de la base
        const convertedUsers = defaultUsers.map(user => ({
          ...user,
          car_plate: user.carPlate,
          payment_method: user.paymentMethod
        }));
        setUsersData(defaultUsers);
      } else {
        // Convertir les données de la base au format de l'app
        const convertedUsers = users.map(user => ({
          ...user,
          carPlate: user.car_plate,
          paymentMethod: user.payment_method
        }));
        setUsersData(convertedUsers);
      }
    } catch (err) {
      console.error('Erreur lors du chargement:', err);
      setError('Erreur de connexion à la base de données');
      // Utiliser les données par défaut en cas d'erreur
      setUsersData(defaultUsers);
    } finally {
      setLoading(false);
    }
  };

  // Rechercher un utilisateur par ID
  const handleSearch = async (id) => {
    try {
      setLoading(true);
      const foundUser = await userService.getUserById(id);
      
      if (foundUser) {
        const convertedUser = {
          ...foundUser,
          carPlate: foundUser.car_plate,
          paymentMethod: foundUser.payment_method
        };
        setUser(convertedUser);
      } else {
        // Fallback sur les données locales
        const localUser = usersData.find(u => u.id === id);
        setUser(localUser || null);
        if (!localUser) {
          alert('Utilisateur non trouvé');
        }
      }
    } catch (err) {
      console.error('Erreur lors de la recherche:', err);
      // Fallback sur les données locales
      const localUser = usersData.find(u => u.id === id);
      setUser(localUser || null);
      if (!localUser) {
        alert('Utilisateur non trouvé');
      }
    } finally {
      setLoading(false);
    }
  };

  // Enregistrer un paiement
  const handlePayment = async (method) => {
    if (!user) return;

    try {
      setLoading(true);
      const updatedUser = await userService.updateUser(user.id, {
        paid: true,
        paymentMethod: method
      });

      if (updatedUser) {
        const convertedUser = {
          ...updatedUser,
          carPlate: updatedUser.car_plate,
          paymentMethod: updatedUser.payment_method
        };
        setUser(convertedUser);
      } else {
        // Fallback sur mise à jour locale
        const updatedLocalUser = { ...user, paid: true, paymentMethod: method };
        setUser(updatedLocalUser);
        const updatedUsers = usersData.map(u =>
          u.id === user.id ? updatedLocalUser : u
        );
        setUsersData(updatedUsers);
      }

      // Recharger la liste des utilisateurs
      await loadUsers();
      alert('Paiement enregistré avec succès!');
    } catch (err) {
      console.error('Erreur lors du paiement:', err);
      // Fallback sur mise à jour locale
      const updatedLocalUser = { ...user, paid: true, paymentMethod: method };
      setUser(updatedLocalUser);
      const updatedUsers = usersData.map(u =>
        u.id === user.id ? updatedLocalUser : u
      );
      setUsersData(updatedUsers);
      alert('Paiement enregistré localement');
    } finally {
      setLoading(false);
    }
  };

  // Connexion admin
  const handleAdminLogin = () => {
    if (adminPassword === 'admin') {
      setIsAdmin(true);
    } else {
      alert('Mot de passe incorrect !');
    }
  };

  // Ajouter un utilisateur (depuis interface admin)
  const handleAddUser = async (event) => {
    event.preventDefault();
    
    try {
      setLoading(true);
      const createdUser = await userService.createUser(newUser);
      
      if (createdUser) {
        const convertedUser = {
          ...createdUser,
          carPlate: createdUser.car_plate,
          paymentMethod: createdUser.payment_method
        };
        setUsersData([...usersData, convertedUser]);
      } else {
        // Fallback sur ajout local
        setUsersData([...usersData, newUser]);
      }

      setNewUser({ id: '', name: '', carPlate: '', paid: false });
      alert('Utilisateur ajouté avec succès!');
      await loadUsers();
    } catch (err) {
      console.error('Erreur lors de l\'ajout:', err);
      // Fallback sur ajout local
      setUsersData([...usersData, newUser]);
      setNewUser({ id: '', name: '', carPlate: '', paid: false });
      alert('Utilisateur ajouté localement');
    } finally {
      setLoading(false);
    }
  };

  // Supprimer un utilisateur
  const handleDeleteUser = async (id) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
      return;
    }

    try {
      setLoading(true);
      const success = await userService.deleteUser(id);
      
      if (success) {
        const updatedUsers = usersData.filter(user => user.id !== id);
        setUsersData(updatedUsers);
        if (user && user.id === id) {
          setUser(null);
        }
        alert('Utilisateur supprimé avec succès!');
      }
    } catch (err) {
      console.error('Erreur lors de la suppression:', err);
      // Fallback sur suppression locale
      const updatedUsers = usersData.filter(user => user.id !== id);
      setUsersData(updatedUsers);
      if (user && user.id === id) {
        setUser(null);
      }
      alert('Utilisateur supprimé localement');
    } finally {
      setLoading(false);
    }
  };

  // Ajouter un utilisateur depuis formulaire d'inscription
  const handleRegister = async (newUserData) => {
    try {
      setLoading(true);
      const createdUser = await userService.createUser(newUserData);
      
      if (createdUser) {
        const convertedUser = {
          ...createdUser,
          carPlate: createdUser.car_plate,
          paymentMethod: createdUser.payment_method
        };
        setUsersData([...usersData, convertedUser]);
      } else {
        // Fallback sur ajout local
        setUsersData([...usersData, newUserData]);
      }
      
      await loadUsers();
    } catch (err) {
      console.error('Erreur lors de l\'inscription:', err);
      // Fallback sur ajout local
      setUsersData([...usersData, newUserData]);
    } finally {
      setLoading(false);
    }
  };

  if (loading && usersData.length === 0) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="mb-4">
            <img
              src="/Capture d'écran 2025-03-23 023405.png"
              alt="Logo Parking"
              className="h-20 mx-auto"
            />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Plateforme Parking</h1>
          {error && (
            <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-4">
              {error} - Fonctionnement en mode local
            </div>
          )}
        </div>

        <div className="max-w-2xl mx-auto">
          {/* Formulaire d'inscription */}
          <SignupForm onRegister={handleRegister} />

          {/* Formulaire de recherche utilisateur (connexion) */}
          <UserForm onSearch={handleSearch} />

          {/* Interface admin protégée */}
          <div className="bg-white p-6 rounded-lg shadow mb-6">
            {!isAdmin ? (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800">Administration</h3>
                <div className="flex gap-2">
                  <input
                    type="password"
                    placeholder="Mot de passe admin"
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button 
                    onClick={handleAdminLogin}
                    className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
                  >
                    Voir liste des utilisateurs
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <UserList
                  usersData={usersData}
                  onSelectUser={handleSearch}
                  onDeleteUser={handleDeleteUser}
                />

                <div className="mt-8 p-6 bg-gray-50 rounded-lg">
                  <h3 className="text-lg font-semibold mb-4 text-gray-800">Ajouter un utilisateur (Admin)</h3>
                  <form onSubmit={handleAddUser} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="ID"
                        value={newUser.id}
                        onChange={(e) => setNewUser({ ...newUser, id: e.target.value })}
                        required
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <input
                        type="text"
                        placeholder="Nom"
                        value={newUser.name}
                        onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                        required
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="Matricule"
                        value={newUser.carPlate}
                        onChange={(e) => setNewUser({ ...newUser, carPlate: e.target.value })}
                        required
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <select
                        value={newUser.paid}
                        onChange={(e) => setNewUser({ ...newUser, paid: e.target.value === 'true' })}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="false">Non payé</option>
                        <option value="true">Payé</option>
                      </select>
                    </div>
                    <button 
                      type="submit"
                      disabled={loading}
                      className="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? 'Ajout...' : 'Ajouter'}
                    </button>
                  </form>
                </div>
              </div>
            )}
          </div>

          {/* Affichage des infos utilisateur + paiement */}
          {user && (
            <div>
              <UserInfo user={user} />
              {!user.paid && <Payment onPay={handlePayment} />}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;