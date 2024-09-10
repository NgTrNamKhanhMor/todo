import { Close } from "@mui/icons-material";
import {
  Box,
  Button,
  CircularProgress,
  Drawer,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  useMediaQuery,
  useTheme
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { categories } from "~/const/categories";
import { useGetCurrentUserId } from "~/hooks/useGetCurrentUserId";
import { useTaskFormik } from "~/hooks/useTaskFormik";
import { Todo } from "~/types/todo";
import DateInput from "~components/DateInput/DateInput";
import DeleteDialog from "~components/DeleteDialog/DeleteDialog";
import TextInput from "~components/TextInput/TextInput";
import { showSnackbar } from "~redux/slices/snackbarSlices";
import { deleteTodo, fetchTodos } from "~redux/slices/todoSlices";
import { AppDispatch } from "~redux/store";

type RightBarProps = {
  open: boolean;
  closeRightBar: () => void;
  selectedTask: Todo | null;
};

export default function RightBar({ open, closeRightBar, selectedTask }: RightBarProps) {
  const dispatch = useDispatch<AppDispatch>();
  const currentUserId = useGetCurrentUserId();
  const theme = useTheme();
  const drawerWidth = 400;
  const collapsedWidth = 150;
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));

  const [header, setHeader] = useState("");
  const [openDeleteTask, setDeleteTaskOpen] = useState(false);

  useEffect(() => {
    if (selectedTask) {
      setHeader("Edit Task");
    } else {
      setHeader("Add Task");
    }
  }, [selectedTask, open]);

  const handleOpenDeleteTaskDialog = () => {
    setDeleteTaskOpen(true);
  };

  const handleCloseDeleteTaskDialog = () => {
    setDeleteTaskOpen(false);
  };
  const handleDeleteTask = async () => {
    const taskId = selectedTask!.id;
    try {
      await dispatch(deleteTodo(taskId)).unwrap();
      await dispatch(fetchTodos(currentUserId!)).unwrap();

      dispatch(
        showSnackbar({ message: "Task deleted successfully", severity: "success" })
      );

      setDeleteTaskOpen(false);
      closeRightBar();
    } catch (error) {
      dispatch(
        showSnackbar({
          message: "Failed to delete task. Please try again.",
          severity: "error",
        })
      );
      console.error("Failed to delete task or fetch todos:", error);
    }
  };


  const formik = useTaskFormik({ selectedTask, closeRightBar });

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
        height={1}
        borderRadius={4}
      >
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          mb={2}
        >
          <Typography variant="h5" textTransform="uppercase">
            {header}
          </Typography>
          <IconButton size="small" onClick={closeRightBar} >
            <Close />
          </IconButton>
        </Box>

        <form onSubmit={formik.handleSubmit}>
          <Box display="flex" flexDirection="column" gap={3} py={3}>
            <TextInput formik={formik} name={"name"} label={"Task Name"} />
            <TextInput formik={formik} name={"description"} label={"Task Description"} />
            <FormControl
              fullWidth
              error={formik.touched.category && Boolean(formik.errors.category)}
            >
              <InputLabel id="task-category-label">Task Category</InputLabel>
              <Select
                labelId="task-category-label"
                name="category"
                value={formik.values.category}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                label="Task Category"
              >
                {categories.map((category, index) => (
                  <MenuItem value={category.value} key={index}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
              {formik.touched.category && formik.errors.category && (
                <Typography variant="body2" color="error" sx={{ mt: 1 }}>
                  {formik.errors.category}
                </Typography>
              )}
            </FormControl>
            <DateInput formik={formik} name="date" label="Date" />
          </Box>

          <Box display="flex" justifyContent="space-between" my={2}>
            {selectedTask ? (
              <Button
                variant="outlined"
                color="error"
                disabled={formik.isSubmitting}
                onClick={handleOpenDeleteTaskDialog}
              >
                Delete Task
              </Button>
            ) : (
              <Box />
            )}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={formik.isSubmitting}
            >
              {formik.isSubmitting ? (
                <>
                  <CircularProgress size={20} sx={{ mr: 1 }} />
                  Saving
                </>
              ) : selectedTask ? (
                "Save Task"
              ) : (
                "Add Task"
              )}
            </Button>
          </Box>
        </form>
      </Box>

      <DeleteDialog
        open={openDeleteTask}
        onClose={handleCloseDeleteTaskDialog}
        onSubmit={handleDeleteTask}
      />
    </Drawer>
  );
}