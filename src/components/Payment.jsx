import React, { useState } from 'react';

function Payment({ onPay }) {
  const [method, setMethod] = useState('Carte');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await onPay(method);
    setLoading(false);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow mt-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-800">Payer maintenant</h3>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Mode de paiement :
          </label>
          <select 
            value={method} 
            onChange={(e) => setMethod(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="Carte">Carte</option>
            <option value="Espèces">Espèces</option>
            <option value="Mobile">Mobile</option>
          </select>
        </div>
        <button 
          type="submit"
          disabled={loading}
          className="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Traitement...' : 'Valider le paiement'}
        </button>
      </form>
    </div>
  );
}

export default Payment;