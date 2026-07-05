import React, { useCallback, useState } from "react";
import { useAuth } from "../Context/AuthContext";

const ReactMemoParent = () => {
  const [count, setCount] = useState<number>(0);
  const authContext = useAuth();

  console.log("this is Auth: data ", authContext);

  const receiveChildEvent = useCallback((eventData: string) => {
    console.log("triggred child event: ", eventData);
    authContext.login("anand", "abc");
  }, []);

  return (
    <div>
      <h1>I am From Parnet Component</h1>
      <button onClick={() => setCount(count + 1)}>
        Increase Count : {count}
      </button>
      <Child count={count} receiveChildEvent={receiveChildEvent} />
    </div>
  );
};

export default ReactMemoParent;

interface PropInterface {
  count?: number;
  receiveChildEvent: (eventData: string) => void;
}

const Child: React.FC<PropInterface> = React.memo(
  ({ count, receiveChildEvent }: PropInterface) => {
    console.log("I am re-rendering");
    return (
      <div>
        <h1>Hello, I am child: {count}</h1>
        <button onClick={() => receiveChildEvent("hello")}>Fetch Data</button>
      </div>
    );
  },
);
