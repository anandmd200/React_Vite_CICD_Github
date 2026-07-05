import React, {
  useDeferredValue,
  useEffect,
  useMemo,
  useRef,
  useState,
  useTransition,
} from "react";
// import Users from "./Practice/components/GetUsers";
import { jsx as _jsx } from "react/jsx-runtime";
// import UseLayoutEffect from "./Practice/components/UseLayoutEffect";
import ReactMemoParent from "./Practice/components/ReactMemo";
import ExampleUseRef from "./Practice/components/UseRef";
import { useDebounce } from "./Practice/Hooks/useDebounce";
import AppRoute from "./routes/AppRoute";
import PostsPage from "./Practice/components/CustomHookUse";
import { AuthProvider } from "./Practice/Context/AuthContext";
import { TodoComponent } from "./Practice/components/ReducerCounter";

import VirtualizedList from "./Practice/components/VirtualList";
import Pagination from "./Practice/components/Pagination";

function App() {
  // const element = _jsx("h1", { className: "title", children: "Hello" });

  // console.log(element);

  return (
    <div>
      {/* <Todo />
      <UseRef /> */}
      {/* <PostsPage /> */}
      {/* <AuthProvider>
        <ReactMemoParent />
      </AuthProvider>
      <VirtualizedList /> */}
      {/* <ExampleUseRef /> */}
      {/* <Counter /> */}
      {/* <AppRoute /> */}
      {/* <Pagination /> */}
      {/* <ProgressBarExample /> */}
      {/* <CounterReducerApp /> */}
      {/* <TodoAppExample /> */}
      {/* <SearchComponent /> */}
      {/* <UncontrolledForm /> */}
      {/* <Users />
      <MyComponent />
      <UseLayoutEffect /> */}
      {/* <UseTransition /> */}
      {/* <TodoComponent /> */}
      <Pagination />
      {/* <SetProgreeBar /> */}
    </div>
  );
}

export default App;

// interface Props {}

// interface State {
//   data: number;
// }

// class MyComponent extends React.Component<Props, State> {
//   constructor(props: Props) {
//     super(props);
//     this.state = { data: 0 };
//   }

//   componentDidMount(): void {
//     console.log("Component mounted");

//     setTimeout(() => {
//       this.setState({ data: 100 });
//     }, 1000);
//   }

//   componentDidUpdate(): void {
//     console.log("Component updated");
//   }

//   componentWillUnmount(): void {
//     console.log("Component unmounted");
//   }

//   render() {
//     return (
//       <>
//         <h1>This is a class-based component</h1>
//         <h6>Data: {this.state.data}</h6>
//       </>
//     );
//   }
// }

// function SearchInput() {
//   const [query, setQuery] = useState("");
//   const debouncedQuery = useDebounce(query, 300);

//   useEffect(() => {
//     if (debouncedQuery) {
//       console.log("Fetching debounce query..."); // Only calls API after 300ms pause
//     }
//   }, [debouncedQuery]);

//   return <input value={query} onChange={(e) => setQuery(e.target.value)} />;
// }

const UseTransition = () => {
  const users = Array.from({ length: 1000 }, (_, i) => ({
    id: Date.now() + i,
    user: `User - ${i}`,
  }));

  const [query, setQuery] = useState("");
  const [pending, startTransition] = useTransition();
  const deferredQuery = useDeferredValue(query);

  const fileredUserLIst = useMemo(() => {
    return users.filter((user) =>
      user.user.includes(deferredQuery.toLocaleLowerCase()),
    );
  }, [deferredQuery]);

  const handleChange = (query: string) => {
    setQuery(query);
    startTransition(() => {
      console.log("heavry list rendiring....");
    });
  };

  return (
    <>
      <input
        type="text"
        value={query}
        onChange={(e) => handleChange(e.target.value)}
      />

      <ul>
        {fileredUserLIst?.map((user) => (
          <li key={user.id}>{user.user}</li>
        ))}
      </ul>
    </>
  );
};

const ProgressBar = ({ value }: { value: number }) => {
  const progress = Math.min(100, value);
  return (
    <div
      style={{
        width: "100%",
        height: "25px",
        backgroundColor: "#ccc",
        borderRadius: "8px",
      }}
    >
      <div
        style={{
          width: `${progress}%`,
          height: "25px",
          backgroundColor: "#1b620b",
          borderRadius: "8px",
          transition: "width 0.2s",
          textAlign: "center",
          color: "#fff",
        }}
      >
        {`${progress}%`}
      </div>
    </div>
  );
};

const SetProgreeBar = () => {
  const [progress, setProgress] = useState<number>(0);
  const timerRef = useRef<any>(null);

  const startProgress = () => {
    if (!timerRef.current) {
      timerRef.current = setInterval(() => {
        setProgress((prev) => prev + 1);
      }, 100);
    }
  };

  const stopProgress = () => {
    clearInterval(timerRef.current);
    timerRef.current = null;
    setProgress(0);
  };

  return (
    <>
      <ProgressBar value={progress} />
      <button onClick={startProgress}>Start Progress</button>
      <button onClick={stopProgress}>Stop Progress</button>
    </>
  );
};
