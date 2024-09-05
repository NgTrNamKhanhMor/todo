import { Box, Pagination, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { ITEMSPERPAGE } from "~/const/system";
import { Todo } from "~/types/todo";
import ControlPanel from "~components/ControlPanel/ControlPanel";
import TodoList from "~components/TodoList/TodoList";
import TodoListSkeleton from "~components/TodoListSkeleton/TodoListSkeleton";
import {
  filterTasksByCompletion,
  filterTasksByDate,
  filterTasksBySearch,
  paginateTasks,
} from "~helpers/filterTodos";
import { getTodosByUserId } from "~redux/slices/todoSlices";
import { selectCurrentUser } from "~redux/slices/userSlices";
import { RootState } from "~redux/store";
import MainHeader from "../components/MainHeader/MainHeader";

export default function Main() {
  const currentUser = useSelector(selectCurrentUser);
  const tasks = useSelector(getTodosByUserId(currentUser!.id));
  const status = useSelector((state: RootState) => state.todos.status);
  const error = useSelector((state: RootState) => state.todos.error);
  const [finalTasks, setFinalTasks] = useState<Todo[]>(tasks);
  const [filteredTotal, setFilteredTotal] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const [totalTasks, setTotalTasks] = useState(0);
  const theme = useTheme();
  const searchQuery = searchParams.get("search") || "";
  const filterQuery = searchParams.get("filter") || "";
  const dateQuery = searchParams.get("date") || "";
  const pageQuery = parseInt(searchParams.get("page") || "1", 10);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    let filteredTasks = tasks;
    filteredTasks = filterTasksBySearch(tasks, searchQuery);
    filteredTasks = filterTasksByCompletion(filteredTasks, filterQuery, setSearchParams, searchParams);
    filteredTasks = filterTasksByDate(filteredTasks, dateQuery, setSearchParams, searchParams);
    const { paginatedTasks, validPage } = paginateTasks(
      filteredTasks,
      pageQuery,
      currentPage,
      searchParams,
      setCurrentPage,
      setSearchParams
    );

    if (JSON.stringify(finalTasks) !== JSON.stringify(paginatedTasks)) {
      setFinalTasks(paginatedTasks);
    }
    if (totalTasks !== filteredTasks.length) {
      setTotalTasks(filteredTasks.length);
    }
    if (filteredTotal !== filteredTasks.length) {
      setFilteredTotal(filteredTasks.length);
    }
    if (currentPage !== validPage) {
      setCurrentPage(validPage);
      const params = new URLSearchParams(searchParams);
      params.set("page", validPage.toString());
      setSearchParams(params);
    }
  }, [
    searchQuery,
    filterQuery,
    dateQuery,
    pageQuery,
    tasks,
    finalTasks,
    totalTasks,
    filteredTotal,
    currentPage,
  ]);

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
        {status === "loading" ? (
          <TodoListSkeleton />
        ) : (
          <TodoList tasks={finalTasks} />
        )}
      </Box>

      <Box mt="auto" width={1} display="flex" justifyContent="center" pb={2}>
        <Pagination
          count={Math.ceil(totalTasks / ITEMSPERPAGE)}
          page={currentPage}
          color="primary"
          onChange={handlePageChange}
        />
      </Box>
    </Box>
  );
}
