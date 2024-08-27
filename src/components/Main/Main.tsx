import {
  Box,
  Typography,
  Button,
  Pagination,
} from "@mui/material";

import { Add } from "@mui/icons-material";
import TodoList from "~components/TodoList/TodoList";
import { useContext, useState } from "react";
import { TaskContext } from "~components/Home/Home";

export default function Main() {
  const {openRightBar} = useContext(TaskContext);
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
  ]);
  return (
    <Box
      display="flex"
      flexGrow={1}
      flexDirection="column"
      minHeight="100vh"
      width="100%"
      p={4}
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
        sx={{ marginBottom: "20px", alignItems: "left" }}
        onClick={()=>openRightBar(null)}
      >
        Add New Task
      </Button>

      <TodoList tasks={tasks} />

      <Box mt="auto" width="100%" display="flex" justifyContent="center" pt={2}>
        <Pagination count={10} color="primary" />
      </Box>
    </Box>
  );
}
