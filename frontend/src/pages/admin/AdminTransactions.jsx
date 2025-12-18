import { Edit, Trash2 } from "lucide-react";

export default function AdminTransactions() {
  // Example static data
  const transactions = [
    {
      id: 1,
      title: "Lunch",
      user: "John Doe",
      category: "Food",
      type: "Expense",
      amount: 500,
      date: "2025-12-18",
    },
    {
      id: 2,
      title: "Salary",
      user: "Jane Smith",
      category: "Income",
      type: "Income",
      amount: 2000,
      date: "2025-12-15",
    },
  ];

  return (
    <div className="min-h-screen p-6 bg-slate-50">
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h1 className="text-2xl font-bold text-slate-900 mb-2">
          All Transactions
        </h1>
        <p className="text-sm text-slate-500 mb-6">
          Overview of all users' transactions. Use filters to refine the list.
        </p>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse">
            <thead className="bg-slate-100 rounded-t-xl">
              <tr className="text-left text-slate-700 text-sm sm:text-base">
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">User</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Type</th>
                <th className="px-4 py-3">Amount</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx) => (
                <tr
                  key={tx.id}
                  className="border-b last:border-none hover:bg-slate-50 transition-colors"
                >
                  <td className="px-4 py-3 text-slate-800">{tx.title}</td>
                  <td className="px-4 py-3 text-slate-800">{tx.user}</td>
                  <td className="px-4 py-3 text-slate-800">{tx.category}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        tx.type === "Income"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {tx.type}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-800">{tx.amount}</td>
                  <td className="px-4 py-3 text-slate-800">{tx.date}</td>
                  <td className="px-4 py-3 flex gap-2">
                    <button className="p-1 bg-indigo-50 text-indigo-600 rounded-md hover:bg-indigo-100 transition">
                      <Edit size={16} />
                    </button>
                    <button className="p-1 bg-red-50 text-red-600 rounded-md hover:bg-red-100 transition">
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Optional Pagination */}
        <div className="mt-4 flex justify-end text-sm text-slate-500">
          Page 1 of 5
        </div>
      </div>
    </div>
  );
}
