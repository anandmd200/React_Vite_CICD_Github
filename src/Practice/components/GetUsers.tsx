import { useAddUserMutation, useGetUsersQuery } from "../../services/userApi";

function Users() {
  const { data, error, isLoading, isFetching } = useGetUsersQuery({});
  const [addUser] = useAddUserMutation();

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  const handleAddUser = () => {
    const payload = { name: "anand" };
    addUser(payload);
  };

  return (
    <div>
      {data?.map((user: any) => (
        <p key={user.id}>{user.name}</p>
      ))}
      <button onClick={() => handleAddUser()}>Save User</button>
    </div>
  );
}

export default Users;
