import { useEffect, useState } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy, arrayMove } from "@dnd-kit/sortable";

import TodoList from "./TodoList";
import TodoForm from "./TodoForm";
import FilterGroup from "./FilterGroup";
import { useLocalStrState } from "../hooks/useLocaleStrState";

const initialTodo = [
  { text: "Learning React", id: 12123120320, isCompleted: false },
  { text: "Learn Astro", id: 1212312012, isCompleted: false },
  { text: "Qliar", id: 12123123, isCompleted: false },
];

export default function Todo() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useLocalStrState("todos", initialTodo);
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredTodos = todos.filter((todo) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "active") return !todo.isCompleted;
    if (activeFilter === "completed") return todo.isCompleted;
  });
  const emptyMessage =
    activeFilter === "all"
      ? "Todo list is empty."
      : activeFilter === "active"
      ? "No active tasks."
      : "No completed tasks.";

  function handleDragEnd(e) {
    const { active, over } = e;

    const oldIndex = todos.findIndex((todo) => todo.id == active.id);
    const newIndex = todos.findIndex((todo) => todo.id === over.id);

    setTodos((prev) => arrayMove(prev, oldIndex, newIndex));
  }

  function handleAddTodo(text) {
    const newTodo = { text, isCompleted: false, id: Date.now() };
    setTodos((todos) => [...todos, newTodo]);
  }
  function handleToggleCompleted(id) {
    setTodos((todos) => todos.map((todo) => (todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo)));
  }
  function handleDeleteTodo(id) {
    setTodos((todos) => todos.filter((todo) => todo.id !== id));
  }
  const handleClearCompleted = () => setTodos((todos) => todos.filter((todo) => !todo.isCompleted));

  useEffect(() => console.log(todos), [todos]);
  return (
    <main className="my-container -translate-y-26 sm:-translate-y-36 space-y-4">
      <TodoForm todo={todo} setTodo={setTodo} onAddTodo={handleAddTodo} />
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={todos} strategy={verticalListSortingStrategy}>
          <TodoList
            todos={todos}
            filteredTodos={filteredTodos}
            onToggleCompleted={handleToggleCompleted}
            onDeleteTodo={handleDeleteTodo}
            onClearCompleted={handleClearCompleted}
            emptyMessage={emptyMessage}
          />
        </SortableContext>
      </DndContext>
      <FilterGroup activeFilter={activeFilter} onSetActiveFilter={setActiveFilter} />
    </main>
  );
}
