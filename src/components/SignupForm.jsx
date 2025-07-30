import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const SignupForm = ({ onRegister }) => {
  const [name, setName] = useState('');
  const [carPlate, setCarPlate] = useState('');
  const [newId, setNewId] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const id = uuidv4().slice(0, 8);
    const newUser = {
      id,
      name,
      carPlate,
      paid: false,
    };
    
    await onRegister(newUser);
    setNewId(id);
    setName('');
    setCarPlate('');
    setLoading(false);
  };

  return (
    <div className="mb-8 bg-white p-6 rounded-lg shadow">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">Inscription</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            placeholder="Nom"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Matricule"
            value={carPlate}
            onChange={(e) => setCarPlate(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <button 
          type="submit" 
          disabled={loading}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Inscription...' : "S'inscrire"}
        </button>
      </form>

      {newId && (
        <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-green-800">
            ✅ Votre identifiant est : <strong className="font-mono">{newId}</strong><br />
            <span className="text-sm">(Notez-le pour vous connecter plus tard)</span>
          </p>
        </div>
      )}
    </div>
  );
};

export default SignupForm;