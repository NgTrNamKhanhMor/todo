import { Box } from '@mui/material';
import { createContext, useState } from 'react';
import { Task } from '~/types/task';
import Main from '~components/Main/Main';
import RightBar from '~components/RightBar/RightBar';
import SideBar from '~components/SideBar/SideBar';

type TaskContextType = {
  openRightBar: (selectedTask: Task | null) => void;
};
const defaultTaskContext: TaskContextType = {
  openRightBar: () => { },
};
export const TaskContext = createContext<TaskContextType>(defaultTaskContext);

export default function Home() {
  const [sideBarOpen, setSideBarOpen] = useState(true);
  const [rightBarOpen, setRightBarOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

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
    <Box display='flex' width="100%">
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
