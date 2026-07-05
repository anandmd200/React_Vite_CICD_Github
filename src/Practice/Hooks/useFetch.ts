import { useEffect, useState } from "react";

// interface UseFetchResult<T> {
//   data: T | null;
//   loading: boolean;
//   error: string | null;
//   refetch: () => void;
// }

// const useFetch = <T>(url: string): UseFetchResult<T> => {
//   const [data, setData] = useState<T | null>(null);
//   const [loading, setLoading] = useState<boolean>(false);
//   const [error, setError] = useState<string | null>(null);

//   const fakeFetch = (url: string) => {
//     return new Promise((resolve, reject) => {
//       if (url) {
//         setTimeout(() => {
//           resolve([
//             {
//               id: 1,
//               title: "This is my post 0",
//             },
//             {
//               id: 2,
//               title: "This is my post 1",
//             },
//             {
//               id: 3,
//               title: "This is my post 2",
//             },
//           ]);
//         }, 1000);
//       } else {
//         reject(new Error("No post found for the user"));
//       }
//     });
//   };

//   const fetchData = async () => {
//     try {
//       setLoading(true);
//       setError(null);
//       const response = await fakeFetch(url);
//       setData(response as T);
//     } catch (err) {
//       setError(err instanceof Error ? err.message : "Unknown error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   return {
//     data,
//     loading,
//     error,
//     refetch: fetchData,
//   };
// };

// export default useFetch;

interface UseFetchResult<T> {
  loading: boolean;
  data: T | null;
  error: string | null;
  refetch: () => void;
}

export const useFetch = <T> (url: string): UseFetchResult<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null)

  const fakeFetch = (url: string) =>{
    return new Promise((resolve, reject) => {
      if(url){
        const response = [
          {id: 1, name: "Anand", hasCar: "No"},
          {id: 1, name: "Anish", hasCar: "No"},
          {id: 1, name: "Aman", hasCar: "No"}
        ]
        resolve(response)
      }else{
        reject(new Error("Please provide valid url"))
      }
    })
  }

  const fetchData = async() => {
    try {
      setLoading(true);
      const data: any = await fakeFetch(url);
      console.log(data);
      setData(data)
       setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(JSON.stringify(error));
    }
  }

  useEffect(()=> {
    fetchData();
  }, [url])


  const refetch = () =>{ 

  }

  return {
    loading,
    data,
    error,
    refetch
  }
} 