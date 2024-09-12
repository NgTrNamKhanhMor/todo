import { useSelector } from "react-redux";
import { todoApi } from "~redux/slices/todoSlices";
import { RootState } from "~redux/store";
import { useGetCurrentUserId } from "./useGetCurrentUserId";

export const useGetTodos = () => {
  const currentUserId = useGetCurrentUserId();
  const todos = useSelector(
    (state: RootState) =>
      todoApi.endpoints.fetchTodos.select(currentUserId!)(state)?.data || []
  );
  return todos;
};
