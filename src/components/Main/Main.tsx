import {
  Box,
  Pagination,
  useTheme
} from "@mui/material";
import { useContext, useState } from "react";
import { TaskContext } from "~components/Home/Home";
import TodoList from "~components/TodoList/TodoList";
import tasksData from '~data/tasks.json';
import MainHeader from "./MainHeader/MainHeader";

export default function Main() {
  const { openRightBar } = useContext(TaskContext);
  const [tasks, setTasks] = useState(tasksData);
  const theme = useTheme();
  return (
    <Box
      component="main"
      pt={4}
      px={{ xs: 2, md: 7 }}
      display='flex'
      flexDirection='column'
      flexGrow={1}
      minHeight="100vh"
      sx={{
        transition: theme.transitions.create(['margin-left', 'margin-right'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.standard,
        }),
        overflowX: 'hidden',
      }}
    >
      <MainHeader openRightBar={openRightBar} tasks={tasks} />

      <Box flexGrow={1}>
        <TodoList tasks={tasks} />
      </Box>

      <Box mt="auto" width={1} display="flex" justifyContent="center" pb={2}>
        <Pagination count={10} color="primary" />
      </Box>
    </Box>
  );
}
