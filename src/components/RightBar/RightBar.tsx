import { Close } from '@mui/icons-material';
import { Box, Button, Checkbox, Drawer, FormControl, FormControlLabel, IconButton, InputLabel, MenuItem, Select, TextField, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useEffect, useState } from 'react';
import { Task } from '~/types/task';
import DeleteDialog from '~components/DeleteDialog/DeleteDialog';
type RightBarProps = {
  open: boolean,
  closeRightBar: () => void,
  selectedTask: Task | null,
}
export default function RightBar({ open, closeRightBar, selectedTask }: RightBarProps) {
  const theme = useTheme();
  const drawerWidth = 400;
  const collapsedWidth = 150;

  const [dueDateEnabled, setDueDateEnabled] = useState(false);
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskCategory, setTaskCategory] = useState('');
  const [taskDate, setTaskDate] = useState('');
  const [header, setHeader] = useState('');

  const isLargeScreen = useMediaQuery(theme.breakpoints.up('lg'));

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
  };
  return (
    <Drawer
      variant={isLargeScreen ? 'persistent' : 'temporary'}
      anchor="right"
      open={open}
      sx={{
        width: open ? drawerWidth : {xxs: 0 , lg: collapsedWidth},
        '& .MuiDrawer-paper': {
          width: open ? drawerWidth : collapsedWidth,
          height: '100%',
          transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.standard,
          }),
          overflowX: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          bgcolor: 'transparent',
          border: 'none',
          boxShadow: 'none',
          justifyContent: 'space-between',
        },
      }}
    >
      <Box bgcolor='rgb(244,244,244)' 
        m={4}
        py={4}
        px={open ? 4 : 2} 
        display='flex' 
        height= {1}
        flexDirection='column' 
        justifyContent='space-between' 
        borderRadius={4}
        sx={{
          transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.standard,
          })
        }}
        >
        <Box display='flex' flexDirection='column' gap={2}>
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
          />

          <FormControl fullWidth>
            <InputLabel id="task-category-label">Task Category</InputLabel>
            <Select
              labelId="task-category-label"
              value={taskCategory}
              onChange={(e) => setTaskCategory(e.target.value)}
              label="Task Category"
            >
              <MenuItem value="" disabled>
                Select Category
              </MenuItem>
              <MenuItem value="Work">Work</MenuItem>
              <MenuItem value="Personal">Personal</MenuItem>
              <MenuItem value="Urgent">Urgent</MenuItem>
            </Select>
          </FormControl>

          <FormControlLabel
            control={
              <Checkbox checked={dueDateEnabled} onChange={handleDueDateChange} />
            }
            label="Set Due Date"
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
