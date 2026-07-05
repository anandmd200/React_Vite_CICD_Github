import { useRef } from "react";

export function UncontrolledForm() {
  const inputRef: any = useRef(null);

  const handleSubmit = () => {
    console.log(inputRef.current.value);
  };

  return (
    <>
      <h1>Uncontrolled Component</h1>
      <input ref={inputRef} defaultValue="Hello" />
      <button onClick={handleSubmit}>Submit</button>
    </>
  );
}
