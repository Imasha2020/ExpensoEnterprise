export default function Button({ children, variant = "primary", ...props }) {
  const styles =
    variant === "secondary"
      ? "bg-gray-200 text-gray-800 hover:bg-gray-300"
      : "bg-indigo-600 text-white hover:bg-indigo-700";

  return (
    <button
      {...props}
      className={`px-4 py-2 rounded-lg transition ${styles}`}
    >
      {children}
    </button>
  );
}
