// import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { decrement, increaseByValue, increment } from "../../lib/CounterSlice";

import { useMemo, useState } from "react";

const pageSize = 5;
const data = Array.from({ length: 50 }, (_, i) => ({
  id: i,
  name: `this is item no ${i}`,
}));

const Pagination = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const totalPage = Math.ceil(data.length / pageSize);
  const count = useSelector((state: any) => state.counter.value);
  const dispatch = useDispatch();

  const currentData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return data.slice(start, start + pageSize);
  }, [currentPage]);

  console.log(currentData);

  const pageNumber = useMemo(() => {
    let pages = [];
    for (let i = 1; i <= totalPage; i++) {
      if (
        i === currentPage ||
        i === totalPage ||
        (i >= currentPage - 1 && i <= currentPage + 1)
      ) {
        pages.push(i);
      } else {
        pages.push("...");
      }
    }
    return pages;
  }, [currentPage, totalPage]);

  return (
    <div>
      <div>
        <h2>Current: {count}</h2>
        <button onClick={() => dispatch(increment())}>Increment</button>
        <button onClick={() => dispatch(decrement())}>Decrement</button>
        <button onClick={() => dispatch(increaseByValue(10))}>By Value</button>
      </div>
      <ul>
        {currentData.map((item) => {
          return <li key={item.id}>{item.name}</li>;
        })}
      </ul>

      <button
        onClick={() => setCurrentPage((p) => p - 1)}
        disabled={currentPage <= 1}
      >
        Prev
      </button>

      {pageNumber.map((page, index) => {
        return (
          <>
            {page === "..." ? (
              <span key={index}>...</span>
            ) : (
              <button
                onClick={() => setCurrentPage(+page)}
                style={currentPage === page ? { fontWeight: "bold" } : {}}
                disabled={currentPage === page}
                key={index}
              >
                {page}
              </button>
            )}
          </>
        );
      })}
      <span>
        {currentPage} of {totalPage}
      </span>
      <button
        onClick={() => setCurrentPage((p) => p + 1)}
        disabled={currentPage >= totalPage}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;

// const data = Array.from({ length: 500 }, (_, i) => ({
//   id: i + 1,
//   item: `Item - ${i}`,
// }));
// const pageSize = 5;

// export const Pagination = () => {
//   const [currentPage, setCurrentPage] = useState<number>(1);
//   const totalPage = Math.ceil(data.length / pageSize);

//   const currentData = useMemo(() => {
//     const start = (currentPage - 1) * pageSize;
//     return data.slice(start, start + pageSize);
//   }, [currentPage]);

//   return (
//     <>
//       <ul>
//         {currentData.map((item) => (
//           <li key={item.id}>{item.item}</li>
//         ))}
//       </ul>

//       <button
//         disabled={currentPage <= 1}
//         onClick={() => setCurrentPage((prev) => prev - 1)}
//       >
//         Prev
//       </button>
//       <span>
//         {currentPage} of {totalPage}
//       </span>
//       <button
//         disabled={currentPage >= totalPage}
//         onClick={() => setCurrentPage((prev) => prev + 1)}
//       >
//         next
//       </button>
//     </>
//   );
// };
