import SummaryCard from "../../components/shared/SummaryCard";
import { Users, CreditCard, DollarSign, Tag } from "lucide-react";

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-slate-50 p-6 sm:p-10 font-sans space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
          Admin Dashboard
        </h1>
        <p className="text-sm sm:text-base text-slate-500 mt-1">
          Overview of all system metrics and KPIs.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <SummaryCard
          title="Users"
          amount="120"
          color="text-indigo-600"
          icon={<Users size={28} className="text-indigo-500" />}
          hoverColor="bg-indigo-50"
        />
        <SummaryCard
          title="Transactions"
          amount="8,450"
          color="text-indigo-600"
          icon={<CreditCard size={28} className="text-indigo-500" />}
          hoverColor="bg-indigo-50"
        />
        <SummaryCard
          title="Income"
          amount="12M"
          color="text-green-600"
          icon={<DollarSign size={28} className="text-green-500" />}
          hoverColor="bg-green-50"
        />
        <SummaryCard
          title="Top Category"
          amount="Food"
          color="text-indigo-600"
          icon={<Tag size={28} className="text-indigo-500" />}
          hoverColor="bg-indigo-50"
        />
      </div>

      {/* Optional Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col hover:shadow-xl transition-shadow duration-300 h-64">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">
            Transactions Over Time
          </h2>
          <div className="flex-1 flex items-center justify-center text-slate-400 font-medium">
            {/* Replace with chart */}
            Chart placeholder
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col hover:shadow-xl transition-shadow duration-300 h-64">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">
            Income Distribution
          </h2>
          <div className="flex-1 flex items-center justify-center text-slate-400 font-medium">
            {/* Replace with chart */}
            Chart placeholder
          </div>
        </div>
      </div>

      {/* Quick Actions / Insights */}
      <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">Quick Actions</h2>
        <p className="text-slate-500 mb-4">
          Perform administrative tasks quickly or view system-wide insights.
        </p>
        <div className="flex flex-wrap gap-3">
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition-colors duration-200">
            Add User
          </button>
          <button className="px-4 py-2 bg-green-50 text-green-700 rounded-lg shadow hover:bg-green-100 transition-colors duration-200">
            Generate Report
          </button>
          <button className="px-4 py-2 bg-red-50 text-red-700 rounded-lg shadow hover:bg-red-100 transition-colors duration-200">
            Monitor Transactions
          </button>
        </div>
      </div>
    </div>
  );
}
