import { useFetch } from "../Hooks/useFetch";

export interface Post {
  id: number;
  name: string;
}

function PostsPage() {
  const { data: posts, loading, error, refetch } = useFetch<Post[]>("posts");

  if (loading) return <p>Loading...</p>;

  if (error)
    return (
      <p>
        Error: {error}
        <button onClick={refetch}>Retry</button>
      </p>
    );

  return (
    <div>
      {posts?.map((post) => (
        <div key={post.id}>{post.name}</div>
      ))}
    </div>
  );
}

export default PostsPage;
