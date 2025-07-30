import React, { useState } from 'react';

function UserForm({ onSearch }) {
  const [inputId, setInputId] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await onSearch(inputId.trim());
    setLoading(false);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow mb-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Entrer ID utilisateur :
          </label>
          <input
            type="text"
            value={inputId}
            onChange={(e) => setInputId(e.target.value)}
            placeholder="Entrez votre ID"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <button 
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Recherche...' : 'Rechercher'}
        </button>
      </form>
    </div>
  );
}

export default UserForm;