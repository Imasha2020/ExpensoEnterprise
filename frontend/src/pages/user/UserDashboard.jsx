import SummaryCard from "../../components/shared/SummaryCard";
import { ChartPie, DollarSign, CreditCard } from "lucide-react"; // better icons

export default function UserDashboard() {
  return (
    <div className="min-h-screen bg-slate-50 p-6 sm:p-8 lg:p-12 font-sans">
      {/* Page Header */}
      <div className="mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Welcome Back!
        </h1>
        <p className="text-slate-500 mt-2 text-sm sm:text-base">
          Here’s an overview of your financial activity this month.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        <SummaryCard
          title="Income"
          amount="120,000"
          color="text-green-600"
          icon={<DollarSign size={28} className="text-green-500" />}
          hoverColor="bg-green-50"
        />
        <SummaryCard
          title="Expense"
          amount="75,000"
          color="text-red-600"
          icon={<CreditCard size={28} className="text-red-500" />}
          hoverColor="bg-red-50"
        />
        <SummaryCard
          title="Balance"
          amount="45,000"
          color="text-indigo-600"
          icon={<ChartPie size={28} className="text-indigo-500" />}
          hoverColor="bg-indigo-50"
        />
      </div>

      {/* Charts / Analytics Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col hover:shadow-xl transition-shadow duration-300 h-64">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">
            Expenses Overview
          </h2>
          <div className="flex-1 flex items-center justify-center text-slate-400 font-medium">
            {/* Replace with actual chart */}
            Expense chart placeholder
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col hover:shadow-xl transition-shadow duration-300 h-64">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">
            Income vs Expense
          </h2>
          <div className="flex-1 flex items-center justify-center text-slate-400 font-medium">
            {/* Replace with actual chart */}
            Income vs Expense chart placeholder
          </div>
        </div>
      </div>

      {/* Quick Actions / Insights Section */}
      <div className="mt-10 bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">
          Quick Insights
        </h2>
        <p className="text-slate-500 text-sm sm:text-base">
          Monitor your financial health and get actionable suggestions to optimize your
          budget. Stay on top of your spending trends and income growth.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition-colors duration-200">
            Add Transaction
          </button>
          <button className="px-4 py-2 bg-green-50 text-green-700 rounded-lg shadow hover:bg-green-100 transition-colors duration-200">
            View Reports
          </button>
          <button className="px-4 py-2 bg-red-50 text-red-700 rounded-lg shadow hover:bg-red-100 transition-colors duration-200">
            Set Budget
          </button>
        </div>
      </div>
    </div>
  );
}
