// src/components/Main/Main.tsx
import { Box, Pagination, useTheme } from "@mui/material";
import { useSelector } from "react-redux";
import { ITEMSPERPAGE } from "~/const/system";
import ControlPanel from "~components/ControlPanel/ControlPanel";
import TodoList from "~components/TodoList/TodoList";
import TodoListSkeleton from "~components/TodoListSkeleton/TodoListSkeleton";
import { getTodosByUserId } from "~helpers/todos";
import { selectCurrentUser } from "~helpers/user";
import { RootState } from "~redux/store";
import MainHeader from "../components/MainHeader/MainHeader";
import { useFilteredTasks } from "~/hooks/useFilterTodos";

export default function Main() {
  const currentUser = selectCurrentUser();
  const tasks = getTodosByUserId(currentUser!.id);
  const status = useSelector((state: RootState) => state.todos.status);

  const {
    finalTasks,
    filteredTotal,
    totalTasks,
    currentPage,
    handlePageChange,
  } = useFilteredTasks(tasks);

  const theme = useTheme();

  return (
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
        {status === "loading" ? (
          <TodoListSkeleton />
        ) : (
          <TodoList tasks={finalTasks} />
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
  );
}
