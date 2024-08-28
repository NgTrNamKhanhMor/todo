import { Box } from '@mui/material';
import { createContext, useState } from 'react';
import { openRightBar } from '~/types/openRightBar';
import { selectedTask } from '~/types/selectedTask';
import { Task } from '~/types/task';
import Main from '~components/Main/Main';
import RightBar from '~components/RightBar/RightBar';
import SideBar from '~components/SideBar/SideBar';

type TaskContextType = {
  openRightBar: openRightBar;
};
const defaultTaskContext: TaskContextType = {
  openRightBar: () => { },
};
export const TaskContext = createContext<TaskContextType>(defaultTaskContext);

export default function Home() {
  const [sideBarOpen, setSideBarOpen] = useState(true);
  const [rightBarOpen, setRightBarOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<selectedTask>(null);

  const toggleSideBar = () => {
    setSideBarOpen(!sideBarOpen);
  };

  const openRightBar = (selectedTask: selectedTask) => {
    setSelectedTask(selectedTask)
    setRightBarOpen(true);
  };
  const closeRightBar = () => {
    setSelectedTask(null)
    setRightBarOpen(false);
  };

  return (
    <Box display='flex' width={1}>
      {/* Left Nav */}
       <SideBar open={sideBarOpen} toggleDrawer={toggleSideBar} />
      {/* Main Section */}
      <TaskContext.Provider value={{ openRightBar }}>
        <Main />
      </TaskContext.Provider>
      {/* Right Bar */}
        <RightBar open={rightBarOpen} closeRightBar={closeRightBar} selectedTask={selectedTask} />
    </Box>
  );
}
