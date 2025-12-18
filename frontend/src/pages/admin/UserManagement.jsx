import { Trash2, UserX } from "lucide-react";

export default function UserManagement() {
  // Example static data
  const users = [
    { id: 1, username: "JohnDoe", email: "john@example.com", role: "USER", status: "Active" },
    { id: 2, username: "JaneSmith", email: "jane@example.com", role: "ADMIN", status: "Disabled" },
    { id: 3, username: "MikeRoss", email: "mike@example.com", role: "USER", status: "Active" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="bg-white rounded-2xl shadow-lg p-6">
        {/* Header */}
        <div className="mb-6 flex flex-col sm:flex-row sm:justify-between sm:items-center">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">User Management</h1>
            <p className="text-sm text-slate-500 mt-1">
              View, search, and manage all users.
            </p>
          </div>
          <div className="mt-4 sm:mt-0">
            <input
              type="text"
              placeholder="Search users..."
              className="px-4 py-2 border border-slate-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 w-full sm:w-64"
            />
          </div>
        </div>

        {/* Users Table */}
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse">
            <thead className="bg-slate-100 text-slate-700 text-left text-sm sm:text-base">
              <tr>
                <th className="px-4 py-3">Username</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Role</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr
                  key={user.id}
                  className="border-b last:border-none hover:bg-slate-50 transition-colors"
                >
                  <td className="px-4 py-3">{user.username}</td>
                  <td className="px-4 py-3">{user.email}</td>
                  <td className="px-4 py-3 font-medium">{user.role}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        user.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 flex gap-2">
                    <button className="p-1 bg-red-50 text-red-600 rounded-md hover:bg-red-100 transition">
                      <UserX size={16} title="Disable" />
                    </button>
                    <button className="p-1 bg-red-50 text-red-600 rounded-md hover:bg-red-100 transition">
                      <Trash2 size={16} title="Delete" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Optional Pagination */}
        <div className="mt-4 flex justify-end text-sm text-slate-500">
          Page 1 of 3
        </div>
      </div>
    </div>
  );
}
