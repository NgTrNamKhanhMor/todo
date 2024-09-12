// src/helpers/useFilteredTasks.ts
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Todo } from "~/types/todo";
import {
  filterTasksByCategory,
  filterTasksByCompletion,
  filterTasksByDate,
  filterTasksBySearch,
  paginateTasks,
  sortTasksByDate,
} from "~helpers/filterTodos";

export function useFilteredTasks(tasks: Todo[]) {
  const [finalTasks, setFinalTasks] = useState<Todo[]>(tasks);
  const [filteredTotal, setFilteredTotal] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const [totalTasks, setTotalTasks] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [isFiltering, setIsFiltering] = useState(true);
  const searchQuery = searchParams.get("search") || "";
  const sortQuery = searchParams.get("sort") || "";
   const completionQuery = searchParams.get("completed") || "";
  const categoryQuery = searchParams.get("category") || "";
  const dateQuery = searchParams.get("date") || "";
  const pageQuery = parseInt(searchParams.get("page") || "1", 10);

  useEffect(() => {
    setIsFiltering(true);
    let filteredTasks = tasks;
    filteredTasks = filterTasksBySearch(tasks, searchQuery);
    filteredTasks = sortTasksByDate(
      filteredTasks,
      sortQuery,
      setSearchParams,
      searchParams
    );
    filteredTasks = filterTasksByCompletion(
      filteredTasks,
      completionQuery,
      setSearchParams,
      searchParams
    );

    filteredTasks = filterTasksByCategory(
      filteredTasks,
      categoryQuery,
      setSearchParams,
      searchParams
    );
    filteredTasks = filterTasksByDate(
      filteredTasks,
      dateQuery,
      setSearchParams,
      searchParams
    );
    const { paginatedTasks } = paginateTasks(
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
    setTotalTasks(filteredTasks.length);
    setFilteredTotal(filteredTasks.length);
    setIsFiltering(false);
  }, [
    searchQuery,
    sortQuery,
    completionQuery,
    dateQuery,
    categoryQuery,
    pageQuery,
    tasks,
    currentPage,
  ]);

  

  return {
    finalTasks,
    filteredTotal,
    totalTasks,
    currentPage,
    isFiltering,
  };
}
