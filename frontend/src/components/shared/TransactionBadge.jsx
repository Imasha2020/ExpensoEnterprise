export default function TransactionBadge({ type }) {
  return (
    <span
      className={`px-2 py-1 rounded-full text-xs text-white
      ${type === "Income" ? "bg-green-500" : "bg-red-500"}`}
    >
      {type}
    </span>
  );
}
