import { Box, useMediaQuery, useTheme } from "@mui/material";
import { createContext, useState } from "react";
import { Outlet } from "react-router-dom";
import { openRightBar } from "~/types/openRightBar";
import { selectedTask } from "~/types/selectedTask";
import RightBar from "~components/RightBar/RightBar";
import SideBar from "~components/SideBar/SideBar";

type TaskContextType = {
  openRightBar: openRightBar;
};
const defaultTaskContext: TaskContextType = {
  openRightBar: (selectedTask: selectedTask | null) => {},
};
export const TaskContext = createContext<TaskContextType>(defaultTaskContext);

export default function Layout() {
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
  const [sideBarOpen, setSideBarOpen] = useState(isLargeScreen ? true : false);
  const [rightBarOpen, setRightBarOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<selectedTask>(null);

  const toggleSideBar = () => {
    setSideBarOpen(!sideBarOpen);
  };

  const openRightBar = (selectedTask: selectedTask) => {
    setSelectedTask(selectedTask);
    setRightBarOpen(true);
  };
  const closeRightBar = () => {
    setSelectedTask(null);
    setRightBarOpen(false);
  };

  return (
    <Box display="flex" width={1}>
      {/* Left Nav */}
      <SideBar open={sideBarOpen} toggleDrawer={toggleSideBar} />
      {/* Main Section */}
      <TaskContext.Provider value={{ openRightBar }}>
        <Outlet />
      </TaskContext.Provider>
      {/* Right Bar */}
      <RightBar
        open={rightBarOpen}
        closeRightBar={closeRightBar}
        selectedTask={selectedTask}
      />
    </Box>
  );
}
