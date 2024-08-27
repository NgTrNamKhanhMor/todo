import { Menu } from '@mui/icons-material';
import { Box, IconButton, Grid, Stack } from '@mui/material';
import { createContext, useState } from 'react';
import { Task } from '~/types/task';
import Main from '~components/Main/Main';
import RightBar from '~components/RightBar/RightBar';
import SideBar from '~components/SideBar/SideBar';

type TaskContextType = {
  openRightBar: (selectedTask: Task | null) => void ;
};
const defaultTaskContext: TaskContextType = {
  openRightBar: () => {}, 
};
export const TaskContext = createContext<TaskContextType>(defaultTaskContext);

export default function Home() {
  const [sideBarOpen, setSideBarOpen] = useState(true);
  const [rightBarOpen, setRightBarOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null >(null);

  const toggleSideBar = () => {
    setSideBarOpen(!sideBarOpen);
  };

  const openRightBar = (selectedTask: Task | null) => {
    setSelectedTask(selectedTask)
    setRightBarOpen(true);
  };
  const closeRightBar = () => {
    setSelectedTask(null)
    setRightBarOpen(false);
  };

  return (
    <Grid container>
      <Grid
        item
        xs={sideBarOpen ? 3 : 0}
        sx={{
          display: { xs: sideBarOpen ? 'block' : 'none', md: 'block' },
          transition: 'width 0.3s ease',
        }}
      >
        <SideBar open={sideBarOpen} toggleDrawer={toggleSideBar} />
      </Grid>

      <Grid
        item
        xs
        sx={{
          display: 'flex',
          flexDirection: 'row',
          transition: 'margin-right 0.3s ease',
        }}
      >
        <Box>
          {!sideBarOpen && (
            <IconButton
              onClick={toggleSideBar}
              sx={{
                ml: 5,
                mr: 7,
                mt: 7
              }}
            >
              <Menu />
            </IconButton>
          )}
        </Box>
        <TaskContext.Provider value={{ openRightBar }}>
          <Main />
        </TaskContext.Provider>

      </Grid>

      <Grid
        item
        xs={rightBarOpen ? 3 : 0}
        sx={{
          display: { xs: rightBarOpen ? 'block' : 'none', md: 'block' },
          transition: 'width 0.3s ease',
        }}
      >
        <RightBar open={rightBarOpen} closeRightBar={closeRightBar} selectedTask={selectedTask} />
      </Grid>
    </Grid>
  );
}
