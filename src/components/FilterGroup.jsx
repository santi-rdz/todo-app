const filters = [
  { label: "All", value: "all" },
  { label: "Active", value: "active" },
  { label: "Completed", value: "completed" },
];
export default function FilterGroup({ activeFilter, onSetActiveFilter }) {
  return (
    <footer className="bg-white dark:bg-navy-900 p-4 shadow-md rounded flex justify-center gap-4">
      {filters.map((f) => (
        <FilterBtn key={f.value} filter={f.value} activeFilter={activeFilter} onSetActiveFilter={onSetActiveFilter}>
          {f.label}
        </FilterBtn>
      ))}
    </footer>
  );
}

function FilterBtn({ children, filter, activeFilter, onSetActiveFilter }) {
  return (
    <button
      onClick={() => onSetActiveFilter(filter)}
      className={`${
        activeFilter === filter ? "text-blue-500" : "text-gray-500 dark:text-purple-600 hover:text-navy-950"
      } cursor-pointer font-bold text-1 transition-colors duration-300`}
    >
      {children}
    </button>
  );
}
