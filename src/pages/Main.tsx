import { Box, useTheme } from "@mui/material";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useFilteredTasks } from "~/hooks/useFilterTodos";
import { useGetCurrentUserId } from "~/hooks/useGetCurrentUserId";
import ControlPanel from "~components/ControlPanel/ControlPanel";
import MySnackBar from "~components/MySnackBar/MySnackBar";
import NoTodo from "~components/NoTodo/NoTodo";
import PaginationBar from "~components/PaginationBar/PaginationBar";
import TodoList from "~components/TodoList/TodoList";
import TodoListSkeleton from "~components/TodoListSkeleton/TodoListSkeleton";
import { useFetchTodosQuery } from "~redux/services/todoApi";
import { showSnackbar } from "~redux/slices/snackbarSlices";
import { AppDispatch } from "~redux/store";
import MainHeader from "../components/MainHeader/MainHeader";

export default function Main() {
  const dispatch = useDispatch<AppDispatch>();
  const currentUserId = useGetCurrentUserId();
  const { data: todos = [], error, isLoading } = useFetchTodosQuery(currentUserId!, {
    skip: !currentUserId,
  });
  const {
    finalTasks,
    filteredTotal,
    totalTasks,
    currentPage,
    isFiltering,
  } = useFilteredTasks(todos);
  const theme = useTheme();
  useEffect(() => {
    if (error) {
      dispatch(
        showSnackbar({
          message: "Fail to get data",
          severity: "warning",
        })
      );
    }
  }, [error])
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
          {isLoading || isFiltering ? (
            <TodoListSkeleton />
          ) : finalTasks.length > 0 ? (
            <TodoList tasks={finalTasks} />
          ) : (
            <NoTodo />
          )}
        </Box>

        <Box mt="auto" width={1} display="flex" justifyContent="center" pb={2}>
          <PaginationBar totalTasks={totalTasks} currentPage={currentPage} />
        </Box>
      </Box>
      <MySnackBar />
    </>
  );
}
