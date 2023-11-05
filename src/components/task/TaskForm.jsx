import useAuth from "../../common/helpers/UseAuth";

export default function TaskForm() {
  const { user } = useAuth();
  return (
    <div>
      <h1>Task Form</h1>
      <p>user: {JSON.stringify(user)}</p>
    </div>
  );
}