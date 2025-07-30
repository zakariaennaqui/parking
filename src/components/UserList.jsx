import React from 'react';

const UserList = ({ usersData, onSelectUser, onDeleteUser }) => {
  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">Liste des utilisateurs</h3>
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-50">
              <th className="border border-gray-200 px-4 py-3 text-left font-medium text-gray-700">ID</th>
              <th className="border border-gray-200 px-4 py-3 text-left font-medium text-gray-700">Nom</th>
              <th className="border border-gray-200 px-4 py-3 text-left font-medium text-gray-700">Matricule</th>
              <th className="border border-gray-200 px-4 py-3 text-left font-medium text-gray-700">Payé</th>
              <th className="border border-gray-200 px-4 py-3 text-left font-medium text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {usersData.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="border border-gray-200 px-4 py-3 text-gray-600">{user.id}</td>
                <td className="border border-gray-200 px-4 py-3 text-gray-800">{user.name}</td>
                <td className="border border-gray-200 px-4 py-3 text-gray-600">{user.carPlate}</td>
                <td className="border border-gray-200 px-4 py-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    user.paid 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {user.paid ? 'Oui' : 'Non'}
                  </span>
                </td>
                <td className="border border-gray-200 px-4 py-3">
                  <div className="flex gap-2">
                    <button 
                      onClick={() => onSelectUser(user.id)}
                      className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
                    >
                      Rechercher
                    </button>
                    <button 
                      onClick={() => onDeleteUser(user.id)}
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
                    >
                      Supprimer
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserList;