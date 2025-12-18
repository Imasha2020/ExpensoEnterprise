export default function SummaryCard({ title, amount, color }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition">
      <p className="text-sm text-gray-500">{title}</p>
      <h2 className={`text-2xl font-bold mt-2 ${color}`}>
        Rs. {amount}
      </h2>
    </div>
  );
}
