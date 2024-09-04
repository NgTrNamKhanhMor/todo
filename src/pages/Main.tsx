import { Box, Pagination, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ControlPanel from "~components/ControlPanel/ControlPanel";
import TodoList from "~components/TodoList/TodoList";
import tasksData from "~data/tasks.json";
import MainHeader from "../components/MainHeader/MainHeader";

export default function Main() {
  const [tasks, setTasks] = useState(tasksData);
  const [filteredTotal, setFilteredTotal] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const [totalTasks, setTotalTasks] = useState(0);
  const itemsPerPage = 5;
  const theme = useTheme();

  const searchQuery = searchParams.get("search") || "";
  const filterQuery = searchParams.get("filter") || "";
  const dateQuery = searchParams.get("date") || "";
  const pageQuery = parseInt(searchParams.get("page") || "1", 10);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    let filteredTasks = tasksData;

    if (searchQuery) {
      filteredTasks = filteredTasks.filter((task) =>
        task.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (filterQuery) {
      switch (filterQuery) {
        case "dateAsc":
          filteredTasks.sort(
            (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
          );
          break;
        case "dateDesc":
          filteredTasks.sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
          );
          break;
        case "completed":
          filteredTasks = filteredTasks.filter((task) => task.completed);
          break;
        case "incomplete":
          filteredTasks = filteredTasks.filter((task) => !task.completed);
          break;
        default:
          break;
      }
    }
    if (dateQuery) {
      const now = new Date();
      const startOfToday = new Date(now.setHours(0, 0, 0, 0)).getTime();
      if (dateQuery === "today") {
        filteredTasks = filteredTasks.filter((task) => {
          const taskDate = new Date(task.date).setHours(0, 0, 0, 0);
          return taskDate == startOfToday;
        });
      } else if (dateQuery === "upcoming") {
        filteredTasks = filteredTasks.filter((task) => {
          const taskDate = new Date(task.date).setHours(0, 0, 0, 0);
          return taskDate > startOfToday;
        });
      } else {
        const startDate = new Date(dateQuery).setHours(0, 0, 0, 0);
        filteredTasks = filteredTasks.filter((task) => {
          const taskDate = new Date(task.date).setHours(0, 0, 0, 0);
          return taskDate === startDate;
        });
      }
    }

    const totalPages = Math.ceil(filteredTasks.length / itemsPerPage);
    const validPage = Math.max(1, Math.min(pageQuery, totalPages));

    const paginatedTasks = filteredTasks.slice(
      (validPage - 1) * itemsPerPage,
      validPage * itemsPerPage
    );

    setTasks(paginatedTasks);
    setTotalTasks(filteredTasks.length);
    setFilteredTotal(filteredTasks.length);
    setCurrentPage(validPage);

    const params = new URLSearchParams(searchParams);
    params.set("page", validPage.toString());
    setSearchParams(params);
  }, [searchQuery, filterQuery, dateQuery, pageQuery]);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    newPage: number
  ) => {
    const params = new URLSearchParams();
    if (searchQuery) params.set("search", searchQuery);
    if (filterQuery) params.set("filter", filterQuery);
    if (dateQuery) params.set("date", dateQuery);
    params.set("page", newPage.toString());
    setSearchParams(params);
  };

  return (
    <Box
      component="main"
      pt={4}
      px={{ xs: 2, md: 7 }}
      display="flex"
      flexDirection="column"
      flexGrow={1}
      minHeight="100vh"
      sx={{
        transition: theme.transitions.create(["margin-left", "margin-right"], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.standard,
        }),
        overflowX: "hidden",
      }}
    >
      <MainHeader title={searchParams} tasksCount={filteredTotal} />
      <ControlPanel />

      <Box flexGrow={1}>
        <TodoList tasks={tasks} />
      </Box>

      <Box mt="auto" width={1} display="flex" justifyContent="center" pb={2}>
        <Pagination
          count={Math.ceil(totalTasks / itemsPerPage)}
          page={currentPage}
          color="primary"
          onChange={handlePageChange}
        />
      </Box>
    </Box>
  );
}
