import { categories } from "~/const/categories";
import { filters } from "~/const/filters";
import { ITEMSPERPAGE } from "~/const/system";
import { Todo } from "~/types/todo";

export function filterTasksBySearch(
  tasks: Todo[],
  searchQuery: string
): Todo[] {
  if (!searchQuery) return tasks;
  return tasks.filter((task) =>
    task.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
}
export function filterTasksByCompletion(
  tasks: Todo[],
  filterQuery: string,
  setSearchParams: (params: URLSearchParams) => void,
  searchParams: URLSearchParams
): Todo[] {
  const validFilterValues = filters.map((filter) => filter.value);
  if (!validFilterValues.includes(filterQuery)) {
    filterQuery = "none";
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set("filter", "none");
    setSearchParams(newParams);
    return tasks;
  }

  switch (filterQuery) {
    case "dateAsc":
      return tasks.sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
      );
    case "dateDesc":
      return tasks.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
    case "completed":
      return tasks.filter((task) => task.completed);
    case "incomplete":
      return tasks.filter((task) => !task.completed);
    default:
      return tasks;
  }
}
export function filterTasksByCategory(
  tasks: Todo[],
  categoryQuery: string,
  setSearchParams: (params: URLSearchParams) => void,
  searchParams: URLSearchParams
): Todo[] {
  if (!categoryQuery) return tasks;
  const validCategoriesValues = categories.map((category) => category.value);
  if (validCategoriesValues.includes(categoryQuery)) {
    const filteredTasks = tasks.filter(
      (task) => task.category === categoryQuery
    );
    return filteredTasks;
  }
  const newParams = new URLSearchParams(searchParams.toString());
  newParams.delete("category");
  setSearchParams(newParams);
  return tasks;
}
export function filterTasksByDate(
  tasks: Todo[],
  dateQuery: string | undefined,
  setSearchParams: (params: URLSearchParams) => void,
  searchParams: URLSearchParams
): Todo[] {
  if (!dateQuery) return tasks;

  const now = new Date();
  const startOfToday = new Date(now.setHours(0, 0, 0, 0)).getTime();

  switch (dateQuery.toLowerCase()) {
    case "today":
      return tasks.filter(
        (task) => new Date(task.date).setHours(0, 0, 0, 0) === startOfToday
      );
    case "upcoming":
      return tasks.filter(
        (task) => new Date(task.date).setHours(0, 0, 0, 0) > startOfToday
      );
    default:
      const parsedDate = Date.parse(dateQuery);
      if (!isNaN(parsedDate)) {
        const startDate = new Date(parsedDate).setHours(0, 0, 0, 0);
        return tasks.filter(
          (task) => new Date(task.date).setHours(0, 0, 0, 0) === startDate
        );
      } else {
        const newParams = new URLSearchParams(searchParams.toString());
        newParams.delete("date");
        setSearchParams(newParams);
        return tasks;
      }
  }
}
export function paginateTasks(
  tasks: Todo[],
  pageQuery: number | string,
  currentPage: number,
  searchParams: URLSearchParams,
  setCurrentPage: (page: number) => void,
  setSearchParams: (params: URLSearchParams) => void
) {
  const parsedPageQuery = parseInt(pageQuery as string, 10);
  const isValidPageQuery = !isNaN(parsedPageQuery) && parsedPageQuery > 0;
  const validPageQuery = isValidPageQuery ? parsedPageQuery : 1;

  const totalPages = Math.ceil(tasks.length / ITEMSPERPAGE);
  const validPage = Math.max(1, Math.min(validPageQuery, totalPages));

  const paginatedTasks = tasks.slice(
    (validPage - 1) * ITEMSPERPAGE,
    validPage * ITEMSPERPAGE
  );

  updatePageIfNeeded(
    currentPage,
    validPage,
    searchParams,
    setCurrentPage,
    setSearchParams,
    isValidPageQuery
  );

  return { paginatedTasks, validPage };
}

function updatePageIfNeeded(
  currentPage: number,
  validPage: number,
  searchParams: URLSearchParams,
  setCurrentPage: (page: number) => void,
  setSearchParams: (params: URLSearchParams) => void,
  isValidPageQuery: boolean
) {
  if (currentPage !== validPage || !isValidPageQuery) {
    setCurrentPage(validPage);
    const params = new URLSearchParams(searchParams);
    params.set("page", validPage.toString());
    setSearchParams(params);
  }
}
