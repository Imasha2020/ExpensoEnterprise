export default function Select({ children, ...props }) {
  return (
    <select
      {...props}
      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
    >
      {children}
    </select>
  );
}
