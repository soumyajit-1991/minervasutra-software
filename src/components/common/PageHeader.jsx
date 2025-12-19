export default function PageHeader({ title, description, action, children }) {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
      <div>
        <h2 className="text-2xl font-bold">{title}</h2>
        {description && <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>}
      </div>
      <div className="flex items-center gap-3">
        {children}
        {action}
      </div>
    </div>
  );
}

