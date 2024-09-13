import { useState } from "react";
import { useSelector } from "react-redux";
import {
  filterTasksByCategory,
  filterTasksByCompletion,
  filterTasksByDate,
  filterTasksBySearch,
  paginateTasks,
  sortTasksByDate,
} from "~/helpers/filterTodos";
import { TodoFilter } from "~/types/filter";
import { todoApi } from "~redux/services/todoApi";
import { RootState } from "~redux/store";
import { useGetCurrentUserId } from "./useGetCurrentUserId";
import { useTodosFilter } from "./useTodosFilter";

export const useGetTodos = (options?: TodoFilter) => {
  const currentUserId = useGetCurrentUserId();
  const [currentPage, setCurrentPage] = useState(1);
  const { setFilters } = useTodosFilter();
  const todos = useSelector(
    (state: RootState) =>
      todoApi.endpoints.fetchTodos.select(currentUserId!)(state)?.data || []
  );

  // Apply filters
  let filteredTodos = todos;

  if (options?.search) {
    filteredTodos = filterTasksBySearch(filteredTodos, options.search);
  }

  if (options?.completed) {
    filteredTodos = filterTasksByCompletion(filteredTodos, options.completed);
  }

  if (options?.category) {
    filteredTodos = filterTasksByCategory(filteredTodos, options.category);
  }

  if (options?.date) {
    filteredTodos = filterTasksByDate(filteredTodos, options.date);
  }

  if (options?.sort) {
    filteredTodos = sortTasksByDate(filteredTodos, options.sort);
  }
  let paginatedTasks = filteredTodos;
  // Pagination
  if (options?.page) {
    paginatedTasks = paginateTasks(
      filteredTodos,
      options.page,
      currentPage,
      setFilters,
      setCurrentPage
    );
  }

  return { filteredTodos, paginatedTasks, currentPage };
};
