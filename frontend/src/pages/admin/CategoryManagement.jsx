import Input from "../../components/shared/input";
import Button from "../../components/shared/Button";
import { Trash2 } from "lucide-react";

export default function CategoryManagement() {
  // Example static categories
  const categories = ["Food", "Travel", "Medical", "Education"];

  return (
    <div className="min-h-screen p-6 bg-slate-50">
      <div className="bg-white rounded-2xl shadow-lg p-6 space-y-6">
        <h1 className="text-2xl font-bold text-slate-900">Category Management</h1>
        <p className="text-sm text-slate-500">
          Add, view, and remove categories for transactions.
        </p>

        {/* Add Category */}
        <div className="flex flex-col sm:flex-row gap-2">
          <Input
            placeholder="New category"
            className="flex-1"
          />
          <Button className="sm:w-auto w-full">Add</Button>
        </div>

        {/* Categories List */}
        <div className="bg-slate-50 p-4 rounded-xl shadow-inner">
          {categories.map((cat, idx) => (
            <div
              key={idx}
              className="flex justify-between items-center p-3 bg-white rounded-lg mb-2 hover:bg-indigo-50 transition"
            >
              <span className="text-slate-800 font-medium">{cat}</span>
              <button className="p-1 text-red-600 hover:bg-red-50 rounded-md transition">
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
