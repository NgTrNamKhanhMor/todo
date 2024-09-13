import { useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { TodoFilter } from "~/types/filter";

export function useTodosFilter() {
  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get("search") as TodoFilter["search"];
  const category = searchParams.get("category") as TodoFilter["category"];
  const date = searchParams.get("date") as TodoFilter["date"];
  const sort = searchParams.get("sort") as TodoFilter["sort"];
  const completed = searchParams.get("completed") as TodoFilter["completed"];
  const page = searchParams.get("page")
    ? parseInt(searchParams.get("page") as string)
    : undefined;

  const setFilters = useCallback(
    (filters: Partial<TodoFilter>) => {
      setSearchParams((params) => {
        if (filters.search === undefined) {
          params.delete("search");
        } else if (filters.search !== null) {
          params.set("search", filters.search);
        }
        if (filters.category === undefined) {
          params.delete("category");
        } else if (filters.category !== null) {
          params.set("category", filters.category);
        }
        if (filters.date === undefined) {
          params.delete("date");
        } else if (filters.date !== null) {
          params.set("date", filters.date);
        }

        if (filters.completed !== undefined) {
          if (filters.completed === null) params.delete("completed");
          else params.set("completed", filters.completed);
        }

        if (filters.sort !== undefined) {
          if (filters.sort === null) params.delete("sort");
          else params.set("sort", filters.sort);
        }

        if (filters.page !== undefined) {
          if (filters.page === null) params.delete("page");
          else params.set("page", filters.page.toString());
        }

        return params;
      });
    },
    [setSearchParams]
  );

  return {
    search,
    category,
    date,
    sort,
    page,
    completed,
    setFilters,
  };
}
