export default function LoadingSpinner({ darkMode, size = "md" }) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12"
  };

  return (
    <div className="flex justify-center items-center p-4">
      <div
        className={`${sizeClasses[size]} border-2 border-t-transparent rounded-full animate-spin ${
          darkMode ? "border-gray-600" : "border-gray-300"
        }`}
        style={{
          borderTopColor: darkMode ? "#60a5fa" : "#3b82f6"
        }}
      ></div>
    </div>
  );
}