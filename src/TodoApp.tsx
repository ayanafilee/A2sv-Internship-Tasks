import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import "./TodoApp.css";

interface Todo {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  priority: "low" | "medium" | "high";
  category: string;
  isCompleted: boolean;
  createdAt: string;
}

interface Filter {
  status: "all" | "completed" | "incomplete";
  category: string;
  priority: "all" | "low" | "medium" | "high";
  searchQuery: string;
}

const TodoApp = () => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  const [formData, setFormData] = useState<Omit<Todo, "id" | "createdAt">>({
    title: "",
    description: "",
    dueDate: "",
    priority: "medium",
    category: "",
    isCompleted: false,
  });

  const [filter, setFilter] = useState<Filter>({
    status: "all",
    category: "all",
    priority: "all",
    searchQuery: "",
  });

  const [sortBy, setSortBy] = useState<"dueDate" | "priority">("dueDate");
  const [editId, setEditId] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    const newTodo: Todo = {
      ...formData,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
    };

    if (editId) {
      setTodos(
        todos.map((todo) =>
          todo.id === editId ? { ...todo, ...formData } : todo
        )
      );
      setEditId(null);
    } else {
      setTodos([...todos, newTodo]);
    }

    setFormData({
      title: "",
      description: "",
      dueDate: "",
      priority: "medium",
      category: "",
      isCompleted: false,
    });
  };

  const filteredTodos = todos.filter((todo) => {
    const matchesStatus =
      filter.status === "all" ||
      (filter.status === "completed" ? todo.isCompleted : !todo.isCompleted);
    const matchesCategory =
      filter.category === "all" || todo.category === filter.category;
    const matchesPriority =
      filter.priority === "all" || todo.priority === filter.priority;
    const matchesSearch =
      todo.title.toLowerCase().includes(filter.searchQuery.toLowerCase()) ||
      todo.description.toLowerCase().includes(filter.searchQuery.toLowerCase());

    return matchesStatus && matchesCategory && matchesPriority && matchesSearch;
  });

  const sortedTodos = [...filteredTodos].sort((a, b) => {
    if (sortBy === "dueDate") {
      const dateA = a.dueDate ? new Date(a.dueDate).getTime() : 0;
      const dateB = b.dueDate ? new Date(b.dueDate).getTime() : 0;
      return dateA - dateB;
    }
    if (sortBy === "priority") {
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    }
    return 0;
  });

  const todoStats = {
    total: todos.length,
    completed: todos.filter((todo) => todo.isCompleted).length,
    overdue: todos.filter(
      (todo) =>
        !todo.isCompleted && todo.dueDate && new Date(todo.dueDate) < new Date()
    ).length,
  };

  return (
    <div className="todo-app">
      <h1>Enhanced Todo List</h1>

      <div className="stats">
        <p>Total: {todoStats.total}</p>
        <p>Completed: {todoStats.completed}</p>
        <p>Overdue: {todoStats.overdue}</p>
      </div>

      <form onSubmit={handleSubmit} className="todo-form">
        <input
          type="text"
          name="title"
          placeholder="Title *"
          value={formData.title}
          onChange={handleInputChange}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleInputChange}
        />
        <input
          type="date"
          name="dueDate"
          value={formData.dueDate}
          onChange={handleInputChange}
        />
        <select
          name="priority"
          value={formData.priority}
          onChange={handleInputChange}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleInputChange}
        />
        <button type="submit">{editId ? "Update Todo" : "Add Todo"}</button>
      </form>

      <div className="controls">
        <select
          value={filter.status}
          onChange={(e) =>
            setFilter({ ...filter, status: e.target.value as Filter["status"] })
          }
        >
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="incomplete">Incomplete</option>
        </select>

        <select
          value={filter.category}
          onChange={(e) => setFilter({ ...filter, category: e.target.value })}
        >
          <option value="all">All Categories</option>
          {[...new Set(todos.map((todo) => todo.category))]
            .filter(Boolean)
            .map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
        </select>

        <select
          value={filter.priority}
          onChange={(e) =>
            setFilter({
              ...filter,
              priority: e.target.value as Filter["priority"],
            })
          }
        >
          <option value="all">All Priorities</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as "dueDate" | "priority")}
        >
          <option value="dueDate">Sort by Due Date</option>
          <option value="priority">Sort by Priority</option>
        </select>

        <input
          type="text"
          placeholder="Search todos..."
          value={filter.searchQuery}
          onChange={(e) =>
            setFilter({ ...filter, searchQuery: e.target.value })
          }
        />
      </div>

      <div className="todo-list">
        {sortedTodos.map((todo) => (
          <div
            key={todo.id}
            className={`todo-item ${todo.priority} ${
              todo.isCompleted ? "completed" : ""
            }`}
          >
            <div className="todo-info">
              <h3>{todo.title}</h3>
              {todo.description && <p>{todo.description}</p>}
              {todo.category && (
                <span className="category">{todo.category}</span>
              )}
              {todo.dueDate && (
                <span className="due-date">
                  Due: {new Date(todo.dueDate).toLocaleDateString()}
                  {!todo.isCompleted && new Date(todo.dueDate) < new Date() && (
                    <span className="overdue"> (Overdue)</span>
                  )}
                </span>
              )}
              <span className={`priority ${todo.priority}`}>
                {todo.priority}
              </span>
            </div>
            <div className="todo-actions">
              <input
                type="checkbox"
                checked={todo.isCompleted}
                onChange={() =>
                  setTodos(
                    todos.map((t) =>
                      t.id === todo.id
                        ? { ...t, isCompleted: !t.isCompleted }
                        : t
                    )
                  )
                }
              />
              <button
                onClick={() => {
                  setFormData({
                    title: todo.title,
                    description: todo.description,
                    dueDate: todo.dueDate,
                    priority: todo.priority,
                    category: todo.category,
                    isCompleted: todo.isCompleted,
                  });
                  setEditId(todo.id);
                }}
              >
                Edit
              </button>
              <button
                onClick={() => setTodos(todos.filter((t) => t.id !== todo.id))}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoApp;
