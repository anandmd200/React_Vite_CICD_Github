import { useState, useTransition, useEffect } from "react";

function SearchComponent() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }

    // const controller = new AbortController();

    async function fetchResults() {
      //   try {
      //     const response = await fetch(
      //       `https://jsonplaceholder.typicode.com/posts?q=${query}`,
      //         { signal: controller.signal },
      //     );
      //     const data = await response.json();
      //     setResults(data);
      //   } catch (error: any) {
      //     if (error.name !== "AbortError") {
      //       console.error(error);
      //     }
      //   }

      console.log("latest Query: ", query);
    }

    fetchResults();

    return () => {
      console.log("I am trigged");
      //   controller.abort();
    };
  }, [query]);

  function handleChange(e: any) {
    const value = e.target.value;

    // Mark this state update as a transition (non-urgent)
    // startTransition(() => {
    setQuery(value);
    // });
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>Search Posts</h2>
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Type to search..."
        style={{ padding: "8px", width: "300px" }}
      />

      {isPending && <p>Loading...</p>}

      <ul>
        {results.map((item: any) => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default SearchComponent;
