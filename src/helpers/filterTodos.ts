import { categories } from "~/const/categories";
import { ITEMSPERPAGE } from "~/const/system";
import { TodoFilter } from "~/types/filter";
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

export function sortTasksByDate(tasks: Todo[], sortQuery: string): Todo[] {
  const tasksCopy = [...tasks];

  if (sortQuery) {
    switch (sortQuery) {
      case "dateAsc":
        return tasksCopy.sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        );
      case "dateDesc":
        return tasksCopy.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
      default:
        return tasks;
    }
  } else {
    return tasks;
  }
}

export function filterTasksByCompletion(
  tasks: Todo[],
  completionQuery: string
): Todo[] {
  if (completionQuery) {
    switch (completionQuery) {
      case "true":
        return tasks.filter((task) => task.completed);
      case "false":
        return tasks.filter((task) => !task.completed);
      default:
        return tasks;
    }
  } else {
    return tasks;
  }
}

export function filterTasksByCategory(
  tasks: Todo[],
  categoryQuery: string
): Todo[] {
  if (categoryQuery) {
    const validCategoriesValues = categories.map((category) => category.value);
    if (validCategoriesValues.includes(categoryQuery)) {
      const filteredTasks = tasks.filter(
        (task) => task.category === categoryQuery
      );
      return filteredTasks;
    }
    return tasks;
  } else {
    return tasks;
  }
}
export function filterTasksByDate(
  tasks: Todo[],
  dateQuery: string | undefined
): Todo[] {
  if (dateQuery) {
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
          return tasks;
        }
    }
  } else {
    return tasks;
  }
}
export function paginateTasks(
  tasks: Todo[],
  pageQuery: number | string,
  currentPage: number,
  setFilters: (filters: Partial<TodoFilter>) => void,
  setCurrentPage: (page: number) => void
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
    setFilters,
    setCurrentPage,
    isValidPageQuery
  );

  return paginatedTasks;
}

function updatePageIfNeeded(
  currentPage: number,
  validPage: number,
  setFilters: (filters: Partial<TodoFilter>) => void,
  setCurrentPage: (page: number) => void,
  isValidPageQuery: boolean
) {
  if (currentPage !== validPage || !isValidPageQuery) {
    setCurrentPage(validPage);
    setFilters({ page: validPage });
  }
}
