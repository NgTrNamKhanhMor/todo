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
} from "~helpers/filterTodos";

export function useFilteredTasks(tasks: Todo[]) {
  const [finalTasks, setFinalTasks] = useState<Todo[]>(tasks);
  const [filteredTotal, setFilteredTotal] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const [totalTasks, setTotalTasks] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [isFiltering, setIsFiltering] = useState(true);
  const searchQuery = searchParams.get("search") || "";
  const filterQuery = searchParams.get("filter") || "";
  const categoryQuery = searchParams.get("category") || "";
  const dateQuery = searchParams.get("date") || "";
  const pageQuery = parseInt(searchParams.get("page") || "1", 10);

  useEffect(() => {
    setIsFiltering(true);
    let filteredTasks = tasks;
    filteredTasks = filterTasksBySearch(tasks, searchQuery);
    filteredTasks = filterTasksByCompletion(
      filteredTasks,
      filterQuery,
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
    filterQuery,
    dateQuery,
    categoryQuery,
    pageQuery,
    tasks,
    currentPage,
  ]);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    newPage: number
  ) => {
    const params = new URLSearchParams();
    if (searchQuery) params.set("search", searchQuery);
    if (filterQuery) params.set("filter", filterQuery);
    if (categoryQuery) params.set("category", categoryQuery);
    if (dateQuery) params.set("date", dateQuery);
    params.set("page", newPage.toString());
    setSearchParams(params);
  };

  return {
    finalTasks,
    filteredTotal,
    totalTasks,
    currentPage,
    handlePageChange,
    isFiltering,
  };
}
