import {
  FormatListBulleted,
  KeyboardDoubleArrowRight
} from "@mui/icons-material";
import {
  Chip,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { RootState } from "~redux/store";

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

  const handleFilterToday = () => {
    setSearchParams({ date: 'today' });
  };
  const handleFilterUpcoming = () => {
    setSearchParams({ date: 'upcoming' });
  };

  const todayTasksCount = getTodayTasksCount();
  const upcomingTasksCount = getUpcomingTasksCount();

  return (
    <>
      <Typography variant="h6" gutterBottom mt={2}>
        Tasks
      </Typography>
      <List>
        <ListItemButton onClick={handleFilterUpcoming}>
          <ListItemIcon>
            <KeyboardDoubleArrowRight />
          </ListItemIcon>
          {open && (
            <>
              <ListItemText primary="Upcoming" />
              <IconButton edge="end" disableRipple>
                <Chip
                  label={upcomingTasksCount}
                  size="small"
                  clickable={false}
                />
              </IconButton>
            </>
          )}
        </ListItemButton>

        <ListItemButton onClick={handleFilterToday}>
          <ListItemIcon>
            <FormatListBulleted />
          </ListItemIcon>
          {open && (
            <>
              <ListItemText primary="Today" />
              <IconButton edge="end" disableRipple>
                <Chip label={todayTasksCount} size="small" clickable={false} />
              </IconButton>
            </>
          )}
        </ListItemButton>
      </List>
    </>
  );
}
