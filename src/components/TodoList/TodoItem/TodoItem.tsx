import { ArrowForwardIos } from "@mui/icons-material";
import {
  Box,
  Checkbox,
  Divider,
  IconButton,
  ListItem,
  Typography,
} from "@mui/material";
import { useContext } from "react";
import { TaskContext } from "~/layouts/Layout";
import { Task } from "~/types/task";
type TodoItemProps = {
  task: Task;
};
export default function TodoItem({ task }: TodoItemProps) {
  const { openRightBar } = useContext(TaskContext);

  return (
    <>
      <ListItem>
        <Box display="flex" alignItems="center" width={1}>
          <Checkbox sx={{ marginRight: 2 }} />
          <Box display="flex" flexDirection="column" flexGrow={1}>
            <Typography variant="h6">{task.name}</Typography>
            <Typography variant="body2" color="text.secondary">
              {task.date}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {task.category}
            </Typography>
          </Box>
        </Box>
        <IconButton onClick={() => openRightBar(task)}>
          <ArrowForwardIos />
        </IconButton>
      </ListItem>
      <Divider />
    </>
  );
}
