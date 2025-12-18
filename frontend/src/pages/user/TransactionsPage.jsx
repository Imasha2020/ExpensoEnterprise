import TransactionBadge from "../../components/shared/TransactionBadge";
import Button from "../../components/shared/Button";

const transactions = [
  {
    id: 1,
    title: "Lunch",
    category: "Food",
    type: "Expense",
    amount: 500,
    date: "2024-03-20",
  },
  {
    id: 2,
    title: "Freelance Work",
    category: "Income",
    type: "Income",
    amount: 1500,
    date: "2024-03-19",
  },
  // Add more transactions here
];

export default function TransactionsPage() {
  return (
    <div className="space-y-8 p-6 font-sans bg-slate-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center border-b border-gray-200 pb-4">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Transactions</h1>
        <Button className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg shadow-md transition-shadow font-semibold">
          Add Transaction
        </Button>
      </div>

      {/* Transactions Table */}
      <div className="bg-white rounded-xl shadow-neumorph overflow-x-auto">
        <table className="min-w-full text-sm text-gray-700">
          <thead className="bg-gray-100">
            <tr>
              {["Title", "Category", "Type", "Amount", "Date"].map((heading) => (
                <th
                  key={heading}
                  className="p-4 text-left font-semibold text-gray-600 uppercase tracking-wider"
                >
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {transactions.map(({ id, title, category, type, amount, date }, i) => {
              const isExpense = type.toLowerCase() === "expense";
              return (
                <tr
                  key={id}
                  className={`border-t cursor-pointer hover:bg-indigo-50 transition ${
                    i % 2 === 0 ? "bg-gray-50" : "bg-white"
                  }`}
                >
                  <td className="p-4 font-medium">{title}</td>
                  <td className="p-4">{category}</td>
                  <td className="p-4">
                    <TransactionBadge type={type} />
                  </td>
                  <td
                    className={`p-4 font-semibold ${
                      isExpense ? "text-red-600" : "text-green-600"
                    }`}
                  >
                    {isExpense ? "-" : "+"}${amount.toLocaleString()}
                  </td>
                  <td className="p-4 text-gray-500">{date}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
