import {
  Chip,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { RootState } from "~redux/store";
import { FormatListBulleted, KeyboardDoubleArrowRight } from "@mui/icons-material";

type SideBarTasksProps = {
  open: boolean;
};

export default function SideBarTasks({ open }: SideBarTasksProps) {
  const tasks = useSelector((state: RootState) => state.todos.todos);
  const [searchParams, setSearchParams] = useSearchParams();

  const todayStr = new Date().toISOString().split("T")[0];

  const getTodayTasksCount = () => {
    return tasks.filter((task) => task.date === todayStr).length;
  };

  const getUpcomingTasksCount = () => {
    return tasks.filter((task) => task.date > todayStr).length;
  };

  const isTodayActive = searchParams.get("date") === "today";
  const isUpcomingActive = searchParams.get("date") === "upcoming";

  const handleFilterToday = () => {
    const newParams = new URLSearchParams(searchParams);
    if (isTodayActive) {
      newParams.delete("date");
    } else {
      newParams.set("date", "today");
    }
    setSearchParams(newParams);
  };

  const handleFilterUpcoming = () => {
    const newParams = new URLSearchParams(searchParams);
    if (isUpcomingActive) {
      newParams.delete("date");
    } else {
      newParams.set("date", "upcoming");
    }
    setSearchParams(newParams);
  };

  const todayTasksCount = getTodayTasksCount();
  const upcomingTasksCount = getUpcomingTasksCount();

  return (
    <>
      <Typography variant="h6" gutterBottom mt={2}>
        Tasks
      </Typography>
      <List>
        <ListItemButton onClick={handleFilterUpcoming} selected={isUpcomingActive}>
          <ListItemIcon>
            <KeyboardDoubleArrowRight />
          </ListItemIcon>
          {open && (
            <>
              <ListItemText primary="Upcoming" />
              <Chip label={upcomingTasksCount} size="small" clickable={false} />
            </>
          )}
        </ListItemButton>

        <ListItemButton onClick={handleFilterToday} selected={isTodayActive}>
          <ListItemIcon>
            <FormatListBulleted />
          </ListItemIcon>
          {open && (
            <>
              <ListItemText primary="Today" />
              <Chip label={todayTasksCount} size="small" clickable={false} />
            </>
          )}
        </ListItemButton>
      </List>
    </>
  );
}
