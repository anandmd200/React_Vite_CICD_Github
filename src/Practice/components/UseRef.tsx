import { useState, useEffect, useRef, useMemo } from "react";

const ExampleUseRef = () => {
  return (
    <>
      <FocusInput />
      <Counter />
      <Timer />
    </>
  );
};

export default ExampleUseRef;

function FocusInput() {
  const inputRef = useRef<HTMLInputElement>(null);

  const focusInput = () => {
    inputRef.current?.focus();
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div>
      <input ref={inputRef} placeholder="I'll be auto-focused" />
      <button onClick={focusInput}>Focus Input</button>
    </div>
  );
}

function Counter() {
  const [count, setCount] = useState(0);
  const prevCountRef = useRef(0); // persists across renders

  const logRefValue = () => {
    console.log(prevCountRef.current);
  };

  useEffect(() => {
    prevCountRef.current = count; // update after render
  }, [count]);

  return (
    <div>
      <h2>Current: {count}</h2>
      <h3>Previous: {prevCountRef.current}</h3>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => logRefValue()}>Ref Log</button>
    </div>
  );
}

// function Timer() {
//   const [seconds, setSeconds] = useState(0);
//   const intervalRef = useRef<any>(null);

//   const startTimer = () => {
//     if (!intervalRef.current) {
//       intervalRef.current = setInterval(() => {
//         setSeconds((prev) => prev + 1);
//       }, 1000);
//     }
//   };

//   const stopTimer = () => {
//     clearInterval(intervalRef.current);
//     intervalRef.current = null;
//   };

//   return (
//     <div>
//       <h2>Seconds: {seconds}</h2>
//       <button onClick={startTimer}>Start</button>
//       <button onClick={stopTimer}>Stop</button>
//     </div>
//   );
// }

function Timer() {
  const [counter, setCounter] = useState<number>(0);
  const timerRef: any = useRef(null);

  const heavyComputation = useMemo(() => {
    return counter * 100;
  }, [counter]);

  const handleStartTimer = () => {
    if (!timerRef.current) {
      timerRef.current = setInterval(() => {
        setCounter((prev) => prev + 1);
      }, 1000);
    }
  };

  const stopTimer = () => {
    setCounter(() => 0);
    clearInterval(timerRef.current);
  };

  return (
    <>
      <h6>
        The counter value : {counter} - {heavyComputation}
      </h6>
      <button onClick={handleStartTimer}>Start Timer</button>
      <button onClick={stopTimer}>Stop Timer</button>
    </>
  );
}
