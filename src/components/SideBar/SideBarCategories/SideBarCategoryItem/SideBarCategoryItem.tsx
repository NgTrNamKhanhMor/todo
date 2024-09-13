import {
  Chip,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useGetTodos } from "~/hooks/useGetTodos";
import { useTodosFilter } from "~/hooks/useTodosFilter";
import { Category } from "~/types/category";
import ColoredBox from "~components/ColoredBox/ColoredBox";

type SideBarCategoryItemProps = {
  open: boolean;
  category: Category;
};

export default function SideBarCategoryItem({
  open,
  category,
}: SideBarCategoryItemProps) {
  const { filteredTodos } = useGetTodos();
  const { category: categoryParams, setFilters } = useTodosFilter();
  const isCategoryActive = categoryParams === category.value;

  const handleFilterCategory = () => {
    if (isCategoryActive) {
      setFilters({category: undefined})
    } else {
      setFilters({category: category.value})
    }
  };

  const getTodayTasksCount = () => {
    return filteredTodos.filter((todo) => todo.category === category.value).length;
  };

  return (
    <ListItemButton alignItems="center" onClick={handleFilterCategory} selected={isCategoryActive}>
      <ListItemIcon>
        <ColoredBox color={category.color} />
      </ListItemIcon>
      {open && <ListItemText primary={category.name} />}
      {open && <Chip label={getTodayTasksCount().toString()} size="small" />}
    </ListItemButton>
  );
}
