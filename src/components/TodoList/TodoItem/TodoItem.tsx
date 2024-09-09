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
import { useDispatch } from "react-redux";
import { TaskContext } from "~/layouts/Layout";
import { Todo } from "~/types/todo";
import { formatDate } from "~helpers/date";
import { toPascalCase } from "~helpers/text";
import { toggleComplete } from "~redux/slices/todoSlices";
import { AppDispatch } from "~redux/store";
type TodoItemProps = {
  task: Todo;
};
export default function TodoItem({ task }: TodoItemProps) {
  const { openRightBar } = useContext(TaskContext);
  const dispatch = useDispatch<AppDispatch>();

  const handleToggleComplete = () => {
    dispatch(toggleComplete(task.id));
  };

  return (
    <>
      <ListItem>
        <Box display="flex" alignItems="center" width={1}>
          <Checkbox sx={{ marginRight: 2 }} checked={task.completed} onChange={handleToggleComplete} />
          <Box display="flex" flexDirection="column" flexGrow={1}>
            <Typography variant="h6">{task.name}</Typography>
            <Typography variant="body2" color="text.secondary">
              {formatDate(task.date)}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {toPascalCase(task.category)}
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
