import { Add } from "@mui/icons-material";
import {
  Box,
  Button,
  Pagination,
  Typography,
  useTheme,
} from "@mui/material";
import { useContext, useState } from "react";
import { TaskContext } from "~components/Home/Home";
import TodoList from "~components/TodoList/TodoList";

export default function Main() {
  const { openRightBar } = useContext(TaskContext);
  const [tasks, setTasks] = useState([
    {
      id: 1,
      name: "Task 1",
      description: "asdfasdfsa",
      date: '2024-11-01',
      category: 'Work',
    },
    {
      id: 2,
      name: "Task 2",
      description: "asdfasdfsa",
      date: '2024-09-01',
      category: 'Work',
    },
    {
      id: 2,
      name: "Task 2",
      description: "asdfasdfsa",
      date: '2024-09-01',
      category: 'Work',
    },
    {
      id: 2,
      name: "Task 2",
      description: "asdfasdfsa",
      date: '2024-09-01',
      category: 'Work',
    },
    {
      id: 2,
      name: "Task 2",
      description: "asdfasdfsa",
      date: '2024-09-01',
      category: 'Work',
    },
    {
      id: 2,
      name: "Task 2",
      description: "asdfasdfsa",
      date: '2024-09-01',
      category: 'Work',
    },
    {
      id: 2,
      name: "Task 2",
      description: "asdfasdfsa",
      date: '2024-09-01',
      category: 'Work',
    },
    {
      id: 2,
      name: "Task 2",
      description: "asdfasdfsa",
      date: '2024-09-01',
      category: 'Work',
    },
    {
      id: 2,
      name: "Task 2",
      description: "asdfasdfsa",
      date: '2024-09-01',
      category: 'Work',
    },
    {
      id: 2,
      name: "Task 2",
      description: "asdfasdfsa",
      date: '2024-09-01',
      category: 'Work',
    },
  ]);
  const theme = useTheme();
  
  return (
    <Box
      component="main"
      pt={4}
      px={{xs: 2, md: 7}}
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
      <Box display="flex" alignItems="center" mb={2} width="100%">
        <Typography variant="h3" component="h1">
          Today
        </Typography>
        <Box
          sx={{
            width: 50,
            height: 50,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "2px solid rgb(244,244,244)",
            borderRadius: "4px",
            fontSize: "2rem",
            fontWeight: "bold",
            color: "black",
            ml: 2,
          }}
        >
          {tasks.length}
        </Box>
      </Box>

      <Button
        variant="outlined"
        color="primary"
        startIcon={<Add />}
        sx={{ marginBottom: "20px" }}
        onClick={() => openRightBar(null)}
      >
        Add New Task
      </Button>

      <Box flexGrow={1}>
        <TodoList tasks={tasks} />
      </Box>

      <Box mt="auto" width="100%" display="flex" justifyContent="center" pb={2}>
        <Pagination count={10} color="primary" />
      </Box>
    </Box>
  );
}
