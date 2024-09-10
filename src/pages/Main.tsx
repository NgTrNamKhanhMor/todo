import { Box, Pagination, useTheme } from "@mui/material";
import { ITEMSPERPAGE } from "~/const/system";
import { useFilteredTasks } from "~/hooks/useFilterTodos";
import useGetTodosByUserId from "~/hooks/useGetTodosByUserId";
import ControlPanel from "~components/ControlPanel/ControlPanel";
import { ErrorSnackBar } from "~components/ErrorSnackbar/ErrorSnackbar";
import NoTodo from "~components/NoTodo/NoTodo";
import TodoList from "~components/TodoList/TodoList";
import TodoListSkeleton from "~components/TodoListSkeleton/TodoListSkeleton";
import MainHeader from "../components/MainHeader/MainHeader";

export default function Main() {
  const { userTodos, status } = useGetTodosByUserId();
  const {
    finalTasks,
    filteredTotal,
    totalTasks,
    currentPage,
    isFiltering,
    handlePageChange,
  } = useFilteredTasks(userTodos);

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
    </>
  );
}
