import { useEffect, useState } from "react";

export function useDebounce(query: string, delay: number) {
  const [debounceQuery, setDebounceQuery] = useState("");

  useEffect(() => {
    const timeOutRef = setTimeout(() => {
      setDebounceQuery(query);
    }, delay);

    return () => {
      clearTimeout(timeOutRef);
    };
  }, [query, delay]);

  return debounceQuery;
}
