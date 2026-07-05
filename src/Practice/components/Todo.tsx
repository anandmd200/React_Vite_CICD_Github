import { useState } from "react";

interface TodoItem {
  id: number;
  taskName: string;
  isCompleted: boolean;
}

const Todo = () => {
  const [todo, setTodo] = useState<TodoItem[]>([
    {
      id: 1,
      taskName: "this is task 1",
      isCompleted: false,
    },
    {
      id: 2,
      taskName: "this is task 2",
      isCompleted: true,
    },
    {
      id: 3,
      taskName: "this is task 3",
      isCompleted: false,
    },
  ]);
  const [taskLabel, setTaskLabel] = useState<String | any>("");

  const handleAddTodo = () => {
    if (!taskLabel.trim()) {
      alert("Please enter valid task");
      return;
    }
    setTodo((prev) => [
      ...prev,
      { id: Date.now(), taskName: taskLabel, isCompleted: false },
    ]);
  };

  const handleChecked = (isChecked: boolean, checkedItem: TodoItem) => {
    setTodo((prev) =>
      prev.map((item: TodoItem) => {
        if (item.id == checkedItem.id) {
          item.isCompleted = isChecked;
        }
        return item;
      }),
    );
  };

  const handleDelete = (deletedItem: TodoItem) => {
    setTodo((prev) =>
      prev.filter((item: TodoItem) => item.id !== deletedItem.id),
    );
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div>
        <h1>Todo App</h1>
        <br />
        <label>Add Todo: </label>
        <input
          type="text"
          value={taskLabel}
          onChange={(e) => setTaskLabel(e.target.value)}
        />
        <button onClick={() => handleAddTodo()}>Add Todo</button>
        <ol>
          {todo.map((item: TodoItem) => {
            return (
              <li key={item.id} style={{ display: "flex", gap: 20 }}>
                <p>{item.taskName}</p>
                <input
                  type="checkbox"
                  checked={item.isCompleted}
                  onChange={(e) => handleChecked(e.target.checked, item)}
                />
                <button onClick={() => handleDelete(item)}>Delete</button>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
};

export default Todo;
