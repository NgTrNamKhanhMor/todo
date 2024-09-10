import { ArrowForwardIos } from "@mui/icons-material";
import {
  Box,
  Checkbox,
  Divider,
  IconButton,
  ListItem,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import { useContext } from "react";
import { useDispatch } from "react-redux";
import { TaskContext } from "~/layouts/Layout";
import { Todo } from "~/types/todo";
import { toPascalCase } from "~helpers/text";
import { showSnackbar } from "~redux/slices/snackbarSlices";
import { toggleComplete } from "~redux/slices/todoSlices";
import { AppDispatch } from "~redux/store";
type TodoItemProps = {
  task: Todo;
};
export default function TodoItem({ task }: TodoItemProps) {
  const { openRightBar } = useContext(TaskContext);
  const dispatch = useDispatch<AppDispatch>();

  const handleToggleComplete = async () => {
    try {
      await dispatch(toggleComplete(task.id)).unwrap();
      dispatch(
        showSnackbar({
          message: "Task completion status updated successfully",
          severity: "success",
        })
      );
    } catch (error) {
      dispatch(
        showSnackbar({
          message: "Failed to update task completion status. Please try again.",
          severity: "error",
        })
      );
    }
  };


  return (
    <>
      <ListItem>
        <Box display="flex" alignItems="center" width={1}>
          <Checkbox sx={{ marginRight: 2 }} checked={task.completed} onChange={handleToggleComplete} />
          <Box display="flex" flexDirection="column" flexGrow={1}>
            <Typography variant="h6">{task.name}</Typography>
            <Typography variant="body2" color="text.secondary">
              {dayjs(task.date).format('MMMM D, YYYY')}
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
