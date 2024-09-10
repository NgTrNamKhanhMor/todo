import { useSelector } from "react-redux";
import { RootState } from "~redux/store";

export const useGetTodos = () => {
  const { todos, status } = useSelector((state: RootState) => state.todos);
  return { todos, status } || null;
};
