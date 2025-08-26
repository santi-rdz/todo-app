export default function TodoForm({ todo, setTodo, onAddTodo }) {
  function handleSubmit(e) {
    e.preventDefault();
    if (!todo.trim()) return;
    onAddTodo(todo);
    setTodo("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        className="rounded bg-white dark:text-purple-100 w-full dark:bg-navy-900 p-6 placeholder:text-gray-600 text-1"
        placeholder="Create a new todo.."
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
      />
    </form>
  );
}
