import { Close } from '@mui/icons-material';
import { Box, Typography, IconButton, TextField, Button, Drawer, Select, MenuItem, Checkbox, FormControlLabel } from '@mui/material';
import { useState, useEffect } from 'react';
import { Task } from '~/types/task';
import DeleteDialog from '~components/DeleteDialog/DeleteDialog';
type RightBarProps = {
  open: boolean,
  closeRightBar: ()=> void,
  selectedTask: Task | null,
}
export default function RightBar({ open, closeRightBar, selectedTask }: RightBarProps) {
  const [dueDateEnabled, setDueDateEnabled] = useState(false);
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskCategory, setTaskCategory] = useState('');
  const [taskDate, setTaskDate] = useState('');
  const [header, setHeader] = useState('');
  console.log(selectedTask)
  useEffect(() => {
    if (selectedTask) {
      setTaskName(selectedTask.name);
      setTaskDescription(selectedTask.description);
      setTaskCategory(selectedTask.category);
      setTaskDate(selectedTask.date);
      setDueDateEnabled(!!selectedTask.date);
      setHeader("Edit Task")
    } else {
      setTaskName('');
      setTaskDescription('');
      setTaskCategory('');
      setTaskDate('');
      setDueDateEnabled(false);
      setHeader("Add Task")
    }
  }, [selectedTask]);
  const handleDueDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDueDateEnabled(event.target.checked);
    if (!event.target.checked) {
      setTaskDate('');
    }
  };

  const [openDeleteTask, setDeleteTaskOpen] = useState(false);

  const handleOpenDeleteTaskDialog = () => {
    setDeleteTaskOpen(true);
  };

  const handleCloseDeleteTaskDialog = () => {
    setDeleteTaskOpen(false);
  };

  const handleSaveTask = () => {
    // Handle task saving logic here
  };
  return (
    <Drawer
      variant="persistent"
      anchor="right"
      open={open}
      sx={{
        '& .MuiDrawer-paper': {
          width: 450,
          padding: 4,
          border: 'none',
        },
      }}
    >
      <Box bgcolor='rgb(244,244,244)' p={4} height={1} display='flex' flexDirection='column' justifyContent='space-between' borderRadius={4}>
        <Box>
          <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
            <Typography variant="h5" textTransform="uppercase">
              {header}
            </Typography>
            <IconButton size="small" onClick={closeRightBar}>
              <Close />
            </IconButton>
          </Box>

          <TextField
            label="Task Name"
            variant="outlined"
            size="small"
            fullWidth
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            sx={{ marginBottom: '20px' }}
          />

          <TextField
            label="Task Description"
            variant="outlined"
            size="small"
            multiline
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
            rows={3}
            fullWidth
            sx={{ marginBottom: '20px' }}
          />

          <Select
            label="Category"
            variant="outlined"
            fullWidth
            value={taskCategory}
            onChange={(e) => setTaskCategory(e.target.value)}
            sx={{ marginBottom: '20px' }}
          >
            <MenuItem value="" disabled>Select Category</MenuItem>
            <MenuItem value="Work">Work</MenuItem>
            <MenuItem value="Personal">Personal</MenuItem>
            <MenuItem value="Urgent">Urgent</MenuItem>
          </Select>

          <FormControlLabel
            control={
              <Checkbox checked={dueDateEnabled} onChange={handleDueDateChange} />
            }
            label="Set Due Date"
            sx={{ marginBottom: '20px' }}
          />

          <TextField
            label="Due Date"
            type="date"
            variant="outlined"
            size="small"
            value={taskDate}
            onChange={(e) => setTaskDate(e.target.value)}
            fullWidth
            disabled={!dueDateEnabled}
            InputLabelProps={{ shrink: true }}
            sx={{ marginBottom: '20px' }}
          />
        </Box>

        <Box display="flex" justifyContent="space-between" my={2}>
          {selectedTask ? (
            <Button variant="outlined" color="error" onClick={handleOpenDeleteTaskDialog}>Delete Task</Button>
          ) : (
            <Box />
          )}
          <Button variant="contained" color="primary" onClick={handleSaveTask}>
            {selectedTask ? 'Save Task' : 'Add Task'}
          </Button>
        </Box>
      </Box>
      <DeleteDialog open={openDeleteTask} onClose={handleCloseDeleteTaskDialog} />
    </Drawer>
  );
}
