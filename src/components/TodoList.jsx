import checkIcon from "../assets/images/icon-check.svg";
import crossIcon from "../assets/images/icon-cross.svg";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export default function TodoList({
  todos,
  filteredTodos,
  onToggleCompleted,
  onDeleteTodo,
  onClearCompleted,
  emptyMessage,
}) {
  const todosLeft = todos.filter((t) => !t.isCompleted).length;
  const completedTodos = todos.filter((t) => t.isCompleted).length;

  if (filteredTodos.length === 0) {
    return (
      <p className="bg-white rounded shadow-md p-4 dark:bg-navy-900 text-gray-600 dark:text-purple-600 font-semibold">
        {emptyMessage}
      </p>
    );
  }

  return (
    <ul className="shadow-xl rounded overflow-hidden border-gray-200 divide-y-2 divide-[#97979748]">
      {filteredTodos.map((todo) => (
        <TodoItem todo={todo} key={todo.id} onToggleCompleted={onToggleCompleted} onDeleteTodo={onDeleteTodo}>
          {todo.text}
        </TodoItem>
      ))}

      <li className="bg-white dark:bg-navy-900 p-4 flex justify-between text-gray-600">
        <p className="font-semibold">
          {todosLeft > 0 ? `${todosLeft} items left` : "All tasks completed, great job! 🎉"}
        </p>
        {completedTodos > 0 && (
          <button className="cursor-pointer text-nowrap" onClick={onClearCompleted}>
            Clear completed
          </button>
        )}
      </li>
    </ul>
  );
}

function TodoItem({ todo, children, onToggleCompleted, onDeleteTodo }) {
  const { id, isCompleted } = todo;
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  return (
    <li
      style={style}
      {...attributes}
      ref={setNodeRef}
      className="bg-white px-6 dark:text-purple-100 dark:bg-navy-900 w-full flex  gap-4 items-center group "
    >
      <button
        htmlFor="check"
        onClick={() => onToggleCompleted(id)}
        className={`${
          isCompleted ? "bg-gradient-to-r from-gradient-1-start to-gradient-1-end" : ""
        } size-5 rounded-full border-gradient-1-end cursor-pointer flex items-center justify-center border `}
      >
        <img src={checkIcon} className={`${isCompleted ? "block" : "hidden"}`} alt="" />
      </button>
      <p
        {...listeners}
        onClick={() => onToggleCompleted(id)}
        className={`${
          isCompleted ? "line-through text-gray-300 dark:text-purple-700" : " "
        }  grow h-full py-6 cursor-grab active:cursor-grabbing`}
      >
        {children}
      </p>
      <button onClick={() => onDeleteTodo(id)} className="ml-auto hidden cursor-pointer group-hover:flex">
        <img src={crossIcon} alt="" className="z-10" />
      </button>
    </li>
  );
}
