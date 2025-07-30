import React from 'react';

function UserInfo({ user }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow mt-6">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Informations utilisateur</h2>
      <div className="space-y-3">
        <div className="flex items-center">
          <span className="font-medium text-gray-600 w-24">ID:</span>
          <span className="font-mono text-gray-800">{user.id}</span>
        </div>
        <div className="flex items-center">
          <span className="font-medium text-gray-600 w-24">Nom:</span>
          <span className="text-gray-800">{user.name}</span>
        </div>
        <div className="flex items-center">
          <span className="font-medium text-gray-600 w-24">Matricule:</span>
          <span className="text-gray-800">{user.carPlate}</span>
        </div>
        <div className="flex items-center">
          <span className="font-medium text-gray-600 w-24">Statut:</span>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
            user.paid 
              ? 'bg-green-100 text-green-800' 
              : 'bg-red-100 text-red-800'
          }`}>
            {user.paid ? '✅ Payé' : '❌ Non payé'}
          </span>
        </div>
        {user.paid && user.paymentMethod && (
          <div className="flex items-center">
            <span className="font-medium text-gray-600 w-24">Paiement:</span>
            <span className="text-gray-800">{user.paymentMethod}</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserInfo;