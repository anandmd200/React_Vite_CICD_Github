import { act, useReducer, useState, type Dispatch } from "react";

interface UserState {
  name: string;
  isLoggedIn: boolean;
}

type UserAction =
  | {
      type: "LOGIN";
      payload: string;
    }
  | {
      type: "LOGOUT";
    };

// Initial State
const initialUserState: UserState = {
  name: "",
  isLoggedIn: false,
};

// Reducer Function
const userReducer = (state: UserState, action: UserAction): UserState => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        name: action.payload,
        isLoggedIn: true,
      };

    case "LOGOUT":
      return initialUserState;

    default:
      return state;
  }
};

// ================= CART REDUCER =================

interface Product {
  id: number;
  name: string;
}

interface CartState {
  products: Product[];
}

type CartAction =
  | {
      type: "ADD_PRODUCT";
      payload: Product;
    }
  | {
      type: "REMOVE_PRODUCT";
      payload: number;
    };

const initialCartState: CartState = {
  products: [],
};

// Reducer

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case "ADD_PRODUCT":
      return {
        products: [...state.products, action.payload],
      };

    case "REMOVE_PRODUCT":
      return {
        products: state.products.filter((item) => item.id !== action.payload),
      };

    default:
      return state;
  }
};

// ================= COMPONENT =================

const Dashboard = () => {
  const [userState, userDispatch] = useReducer(userReducer, initialUserState);

  const [cartState, cartDispatch] = useReducer(cartReducer, initialCartState);

  return (
    <div>
      <h1>User Management</h1>

      <h2>Name: {userState.name}</h2>

      <h3>
        Logged In:
        {userState.isLoggedIn ? "Yes" : "No"}
      </h3>

      <button
        onClick={() =>
          userDispatch({
            type: "LOGIN",
            payload: "Anand",
          })
        }
      >
        Login
      </button>

      <button
        onClick={() =>
          userDispatch({
            type: "LOGOUT",
          })
        }
      >
        Logout
      </button>

      <hr />

      <h1>Cart Management</h1>

      <button
        onClick={() =>
          cartDispatch({
            type: "ADD_PRODUCT",

            payload: {
              id: 1,
              name: "Laptop",
            },
          })
        }
      >
        Add Laptop
      </button>

      <h3>Cart Items:</h3>

      {cartState.products.map((product) => (
        <p key={product.id}>
          {product.name}

          <button
            onClick={() =>
              cartDispatch({
                type: "REMOVE_PRODUCT",
                payload: product.id,
              })
            }
          >
            Remove
          </button>
        </p>
      ))}
    </div>
  );
};

export default Dashboard;

const counterReducer = (
  state: number,
  action: {
    type: "INCREASE" | "DECREASE";
    payload: number;
  },
) => {
  switch (action.type) {
    case "INCREASE":
      return state + action.payload;
    case "DECREASE":
      return state - action.payload;
    default:
      return state;
  }
};

export const CounterReducerApp = () => {
  const [state, counterDispatch] = useReducer(counterReducer, 0);

  const handleIncrease = () => {
    counterDispatch({ type: "INCREASE", payload: 1 });
  };

  const handleDecrease = () => {
    counterDispatch({ type: "DECREASE", payload: 1 });
  };

  return (
    <>
      <h6>Current Couter Value : {state}</h6>
      <button onClick={handleIncrease}>Increase</button>
      <button onClick={handleDecrease}>Decrease</button>
    </>
  );
};

// type Item = {
//   id: number;
//   task: string;
//   done: boolean;
// };

// type Action =
//   | { type: "ADD"; payload: Item }
//   | { type: "DELETE"; payload: Item }
//   | { type: "COMPLETE"; payload: Item };

// const reducerTodo = (state: Item[], action: Action): any => {
//   switch (action.type) {
//     case "ADD":
//       return [...state, action.payload];
//     case "COMPLETE":
//       return [
//         ...state.map((item) =>
//           item.id === action.payload.id
//             ? { ...item, done: !item.done }
//             : { item },
//         ),
//       ];
//     case "DELETE":
//       const result = [...state.filter((item) => item.id != action.payload.id)];
//       console.log(result);
//       return [...state.filter((item) => item.id != action.payload.id)];
//     default:
//       return state;
//   }
// };

// export const TodoAppExample = () => {
//   const [state, todoDispatch] = useReducer(reducerTodo, [
//     {
//       id: 1782637617210,
//       task: "Task 1",
//       done: false,
//     },
//     {
//       id: 1782637620459,
//       task: "Task 2",
//       done: false,
//     },
//     {
//       id: 1782637663575,
//       task: "Task 3",
//       done: false,
//     },
//   ]);

//   function AddTodo() {
//     let item: Item = {
//       id: Date.now(),
//       task: "Task 1",
//       done: false,
//     };
//     todoDispatch({ type: "ADD", payload: item });
//   }

//   console.log(state);

//   return (
//     <>
//       <button onClick={AddTodo}>Add Todo</button>
//       <ul>
//         {state.map((item) => {
//           return (
//             <TodoItemList
//               key={item.id}
//               item={item}
//               todoDispatch={todoDispatch}
//             />
//           );
//         })}
//       </ul>
//     </>
//   );
// };

// const TodoItemList = ({
//   item,
//   todoDispatch,
// }: {
//   item: Item;
//   todoDispatch: any;
// }) => {
//   const handleDelete = () => {
//     console.log(item, "To delete");
//     todoDispatch({ type: "DELETE", payload: item });
//   };

//   const handleComplete = () => {
//     todoDispatch({ type: "COMPLETE", payload: item });
//   };

//   return (
//     <li key={item.id}>
//       <input type="checkbox" checked={item.done} onChange={handleComplete} />
//       <span>{item.task}</span>
//       <button onClick={handleDelete}>Delete</button>
//     </li>
//   );
// };

// type Item = {
//   id: number;
//   task: string;
//   done: boolean;
// };

// type Action =
//   | {
//       type: "ADD";
//       payload: Item;
//     }
//   | {
//       type: "DELETE";
//       payload: number;
//     }
//   | {
//       type: "COMPLETE";
//       payload: number;
//     };

// const reducerTodo = (state: Item[], action: Action): Item[] => {
//   switch (action.type) {
//     case "ADD":
//       return [...state, action.payload];

//     case "COMPLETE":
//       return state.map((item) =>
//         item.id === action.payload
//           ? {
//               ...item,
//               done: !item.done,
//             }
//           : item,
//       );

//     case "DELETE":
//       return state.filter((item) => item.id !== action.payload);

//     default:
//       return state;
//   }
// };

// export const TodoAppExample = () => {
//   const [task, setTask] = useState<string>("");
//   const [state, todoDispatch] = useReducer(reducerTodo, [
//     {
//       id: 1782637617210,
//       task: "Task 1",
//       done: false,
//     },
//     {
//       id: 1782637620459,
//       task: "Task 2",
//       done: false,
//     },
//   ]);

//   function AddTodo() {
//     if (!task.trim()) {
//       alert("Add valid task.");
//       return;
//     }
//     const item: Item = {
//       id: Date.now(),
//       task: task,
//       done: false,
//     };

//     todoDispatch({
//       type: "ADD",
//       payload: item,
//     });
//   }

//   return (
//     <>
//       <label>Add Task</label>
//       <input
//         type="text"
//         value={task}
//         onChange={(e) => setTask(e.target.value)}
//       />
//       <button onClick={AddTodo}>Add Todo</button>

//       <ul>
//         {state.map((item) => (
//           <TodoItemList key={item.id} item={item} todoDispatch={todoDispatch} />
//         ))}
//       </ul>
//     </>
//   );
// };

// const TodoItemList = ({
//   item,
//   todoDispatch,
// }: {
//   item: Item;
//   todoDispatch: Dispatch<Action>;
// }) => {
//   const handleDelete = () => {
//     todoDispatch({
//       type: "DELETE",
//       payload: item.id,
//     });
//   };

//   const handleComplete = () => {
//     todoDispatch({
//       type: "COMPLETE",
//       payload: item.id,
//     });
//   };

//   return (
//     <li>
//       <input type="checkbox" checked={item.done} onChange={handleComplete} />

//       <span>{item.task}</span>

//       <button onClick={handleDelete}>Delete</button>
//     </li>
//   );
// };

interface Item {
  id: number;
  taskName: string;
  done: boolean;
}

type Action =
  | {
      type: "ADD";
      payload: Item;
    }
  | { type: "DELETE"; payload: number }
  | { type: "DONE"; payload: number };

const toDoReduce = (state: Item[], action: Action): Item[] => {
  switch (action.type) {
    case "ADD":
      return [...state, action.payload];
    case "DELETE":
      return state.filter((item) => item.id !== action.payload);
    case "DONE":
      return state.map((item) =>
        item.id === action.payload ? { ...item, done: !item.done } : item,
      );
    default:
      return state;
  }
};

export const TodoComponent = () => {
  const [state, todoDispatch] = useReducer(toDoReduce, []);
  const [task, setTask] = useState<string>("");

  const handleAddTodo = () => {
    if (!task.trim()) {
      alert("Please enter a valid text");
      return;
    }
    const todo: Item = {
      id: Date.now(),
      taskName: task,
      done: false,
    };
    todoDispatch({ type: "ADD", payload: todo });
  };

  return (
    <>
      <h1>This is Todo App</h1>
      <h4>Add Task</h4>
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <button onClick={handleAddTodo}>Add Todo</button>
      <div>
        {state.map((item) => (
          <TodoItem key={item.id} item={item} todoDispatch={todoDispatch} />
        ))}
      </div>
    </>
  );
};

const TodoItem = ({
  item,
  todoDispatch,
}: {
  item: Item;
  todoDispatch: Dispatch<Action>;
}) => {
  const handleTaskDone = (id: number) => {
    todoDispatch({ type: "DONE", payload: id });
  };

  const handleDetete = (id: number) => {
    todoDispatch({ type: "DELETE", payload: id });
  };

  return (
    <div>
      <input
        type="checkbox"
        checked={item.done}
        onChange={() => handleTaskDone(item.id)}
      />
      <span>{item.taskName}</span>
      <button onClick={() => handleDetete(item.id)}>Delete</button>
    </div>
  );
};
