import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUserId } from "~helpers/user";
import { fetchTodos } from "~redux/slices/todoSlices";
import { AppDispatch, RootState } from "~redux/store";

export default function useGetTodosByUserId() {
  const dispatch = useDispatch<AppDispatch>();
  const currentUserId = selectCurrentUserId();
  const { todos, status } = useSelector((state: RootState) => state.todos);

  useEffect(() => {
    if (currentUserId) {
      dispatch(fetchTodos());
    }
  }, [dispatch, currentUserId]);

  const userTodos = todos.filter((todo) => todo.user === currentUserId);

  return { userTodos, status };
}
