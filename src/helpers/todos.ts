import { useSelector } from "react-redux";
import { RootState } from "~redux/store";

export const getTodosByUserId = (userId: number) => {
  const todosSlice = useSelector((state: RootState) => state.todos);
  return todosSlice.todos?.filter((todo) => todo.user === userId);
};
