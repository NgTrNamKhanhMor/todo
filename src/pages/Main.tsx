import { Box, Pagination, useTheme } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ITEMSPERPAGE } from "~/const/system";
import { useFilteredTasks } from "~/hooks/useFilterTodos";
import { useGetCurrentUserId } from "~/hooks/useGetCurrentUserId";
import ControlPanel from "~components/ControlPanel/ControlPanel";
import { ErrorSnackBar } from "~components/ErrorSnackbar/ErrorSnackbar";
import { InfoSnackBar } from "~components/InfoSnackBar/InfoSnackBar";
import NoTodo from "~components/NoTodo/NoTodo";
import TodoList from "~components/TodoList/TodoList";
import TodoListSkeleton from "~components/TodoListSkeleton/TodoListSkeleton";
import { fetchTodos } from "~redux/slices/todoSlices";
import { AppDispatch, RootState } from "~redux/store";
import MainHeader from "../components/MainHeader/MainHeader";

export default function Main() {
  const dispatch = useDispatch<AppDispatch>();
  const currentUserId = useGetCurrentUserId();
  const { todos, status } = useSelector((state: RootState) => state.todos);
  const {
    finalTasks,
    filteredTotal,
    totalTasks,
    currentPage,
    isFiltering,
    handlePageChange,
  } = useFilteredTasks(todos);

  useEffect(() => {
    dispatch(fetchTodos(currentUserId!));
  }, []);
  const theme = useTheme();
  return (
    <>
      <Box
        component="main"
        pt={4}
        px={{ xs: 2, md: 7 }}
        display="flex"
        flexDirection="column"
        flexGrow={1}
        minHeight="100vh"
        sx={{
          transition: theme.transitions.create(["margin-left", "margin-right"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.standard,
          }),
          overflowX: "hidden",
        }}
      >
        <MainHeader tasksCount={filteredTotal} />
        <ControlPanel />

        <Box flexGrow={1}>
          {status === "loading" || isFiltering ? (
            <TodoListSkeleton />
          ) : finalTasks.length > 0 ? (
            <TodoList tasks={finalTasks} />
          ) : (
            <NoTodo />
          )}
        </Box>

        <Box mt="auto" width={1} display="flex" justifyContent="center" pb={2}>
          <Pagination
            count={Math.ceil(totalTasks / ITEMSPERPAGE)}
            page={currentPage}
            color="primary"
            onChange={handlePageChange}
          />
        </Box>
      </Box>
      <ErrorSnackBar />
      <InfoSnackBar />
    </>
  );
}
