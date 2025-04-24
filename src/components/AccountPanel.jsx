import { useAuth } from '../context/AuthContext';

const AccountPanel = () => {
  const { user, logout } = useAuth();

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg">
      <div className="flex items-center space-x-4 mb-4">
        <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
          {user?.name?.charAt(0).toUpperCase()}
        </div>
        <div>
          <h3 className="font-semibold">{user?.name}</h3>
          <p className="text-sm text-gray-600">{user?.email}</p>
        </div>
      </div>
      <button
        onClick={logout}
        className="w-full py-2 px-4 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
      >
        Sign Out
      </button>
    </div>
  );
};

export default AccountPanel;
