export default function Button({ children, ...props }) {
  return (
    <button
      {...props}
      className="w-full bg-blue-600 text-white py-3 rounded-xl mt-4"
    >
      {children}
    </button>
  );
}
