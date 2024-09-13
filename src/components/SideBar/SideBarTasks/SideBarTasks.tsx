import { FormatListBulleted, KeyboardDoubleArrowRight } from "@mui/icons-material";
import {
  Chip,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { useGetTodos } from "~/hooks/useGetTodos";
import { useTodosFilter } from "~/hooks/useTodosFilter";

type SideBarTasksProps = {
  open: boolean;
};

export default function SideBarTasks({ open }: SideBarTasksProps) {
  const { filteredTodos } = useGetTodos();
  const { date: dateParams, setFilters } = useTodosFilter();
  const todayStr = new Date().toISOString().split("T")[0];
  const isTodayActive = dateParams === "today";
  const isUpcomingActive = dateParams === "upcoming";

  const getTodayTasksCount = () => {
    return filteredTodos.filter((todo) => {
      const todoDate = new Date(todo.date).toISOString().split("T")[0];
      return todoDate === todayStr;
    }).length;
  };

  const getUpcomingTasksCount = () => {
    return filteredTodos.filter((todo) => {
      const todoDate = new Date(todo.date).toISOString().split("T")[0];
      return todoDate > todayStr;
    }).length;
  };

  const handleFilterToday = () => {
    if (isTodayActive) {
      setFilters({ date: undefined })
    } else {
      setFilters({ date: "today" })
    }
  };

  const handleFilterUpcoming = () => {
    if (isUpcomingActive) {
      setFilters({ date: undefined })
    } else {
      setFilters({ date: "upcoming" })
    }
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
