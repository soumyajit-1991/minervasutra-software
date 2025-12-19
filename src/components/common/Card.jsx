export default function Card({ children, className = "" }) {
  return (
    <div
      className={`rounded-lg shadow transition-colors duration-300 bg-white text-gray-900 dark:bg-gray-700 dark:text-gray-100 ${className}`}
    >
      {children}
    </div>
  );
}

