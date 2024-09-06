import { Close } from "@mui/icons-material";
import {
  Box,
  Button,
  Drawer,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { categories } from "~/const/categories";
import { Todo } from "~/types/todo";
import DeleteDialog from "~components/DeleteDialog/DeleteDialog";
import { selectCurrentUser } from "~helpers/user";
import { addTodo, deleteTodo, updateTodo } from "~redux/slices/todoSlices";
import { AppDispatch } from "~redux/store";

type RightBarProps = {
  open: boolean;
  closeRightBar: () => void;
  selectedTask: Todo | null;
};

export default function RightBar({
  open,
  closeRightBar,
  selectedTask,
}: RightBarProps) {
  const dispatch = useDispatch<AppDispatch>();
  const currentUser = selectCurrentUser();
  const theme = useTheme();
  const drawerWidth = 400;
  const collapsedWidth = 150;

  const [task, setTask] = useState({
    name: "",
    description: "",
    category: "",
    date: "",
  });

  const [header, setHeader] = useState("");
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));

  useEffect(() => {
    if (selectedTask) {
      setTask({
        name: selectedTask.name,
        description: selectedTask.description,
        category: selectedTask.category,
        date: selectedTask.date,
      });
      setHeader("Edit Task");
    } else {
      setTask({
        name: "",
        description: "",
        category: "",
        date: "",
      });
      setHeader("Add Task");
    }
  }, [selectedTask, open]);

  const handleInputChange = (
    e:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent<string>
  ) => {
    const { name, value } = e.target as HTMLInputElement | HTMLTextAreaElement;

    setTask((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    const { name, value } = event.target;
    setTask((prevState) => ({
      ...prevState,
      [name!]: value,
    }));
  };

  const [openDeleteTask, setDeleteTaskOpen] = useState(false);

  const handleOpenDeleteTaskDialog = () => {
    setDeleteTaskOpen(true);
  };

  const handleCloseDeleteTaskDialog = () => {
    setDeleteTaskOpen(false);
  };

  const handleDeleteTask = () => {
    const taskId = selectedTask!.id;
    dispatch(deleteTodo(taskId));
    setDeleteTaskOpen(false);
    closeRightBar();
  };

  const handleSaveTask = () => {
    const taskData: Todo = {
      id: selectedTask?.id || 0,
      name: task.name,
      description: task.description,
      category: task.category,
      date: task.date,
      completed: selectedTask?.completed || false,
      user: currentUser!.id,
    };

    if (taskData.id) {
      dispatch(updateTodo(taskData));
    } else {
      dispatch(addTodo(taskData));
    }
    closeRightBar();
  };
  return (
    <Drawer
      variant={isLargeScreen ? "persistent" : "temporary"}
      anchor="right"
      open={open}
      sx={{
        width: open ? drawerWidth : { xxs: 0, lg: collapsedWidth },
        "& .MuiDrawer-paper": {
          width: open ? drawerWidth : collapsedWidth,
          height: "100%",
          transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.standard,
          }),
          overflowX: "hidden",
          display: "flex",
          flexDirection: "column",
          bgcolor: "transparent",
          border: "none",
          boxShadow: "none",
          justifyContent: "space-between",
        },
      }}
    >
      <Box
        bgcolor="rgb(244,244,244)"
        m={4}
        py={4}
        px={open ? 4 : 2}
        display="flex"
        height={1}
        flexDirection="column"
        justifyContent="space-between"
        borderRadius={4}
        sx={{
          transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.standard,
          }),
        }}
      >
        <Box display="flex" flexDirection="column" gap={2}>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            mb={2}
          >
            <Typography variant="h5" textTransform="uppercase">
              {header}
            </Typography>
            <IconButton size="small" onClick={closeRightBar}>
              <Close />
            </IconButton>
          </Box>
          <TextField
            label="Task Name"
            name="name"
            variant="outlined"
            size="small"
            fullWidth
            value={task.name}
            onChange={handleInputChange}
          />
          <TextField
            label="Task Description"
            name="description"
            variant="outlined"
            size="small"
            multiline
            value={task.description}
            onChange={handleInputChange}
            rows={3}
            fullWidth
          />

          <FormControl fullWidth>
            <InputLabel id="task-category-label">Task Category</InputLabel>
            <Select
              labelId="task-category-label"
              name="category"
              value={task.category}
              onChange={handleSelectChange}
              label="Task Category"
            >
              {categories.map((category, index) => (
                <MenuItem value={category.value} key={index}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label="Date"
            name="date"
            type="date"
            variant="outlined"
            size="small"
            value={task.date}
            onChange={handleInputChange}
            fullWidth
            InputLabelProps={{ shrink: true }}
          />
        </Box>
        <Box display="flex" justifyContent="space-between" my={2}>
          {selectedTask ? (
            <Button
              variant="outlined"
              color="error"
              onClick={handleOpenDeleteTaskDialog}
            >
              Delete Task
            </Button>
          ) : (
            <Box />
          )}
          <Button variant="contained" color="primary" onClick={handleSaveTask}>
            {selectedTask ? "Save Task" : "Add Task"}
          </Button>
        </Box>
      </Box>
      <DeleteDialog
        open={openDeleteTask}
        onClose={handleCloseDeleteTaskDialog}
        onSubmit={handleDeleteTask}
      />
    </Drawer>
  );
}
