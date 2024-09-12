import {
  Chip,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useSearchParams } from "react-router-dom";
import { useGetTodos } from "~/hooks/useGetTodos";
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
  const todos = useGetTodos();
  const [searchParams, setSearchParams] = useSearchParams();
  const isCategoryActive = searchParams.get("category") === category.value;

  const handleFilterCategory = () => {
    const newParams = new URLSearchParams(searchParams);
    if (isCategoryActive) {
      newParams.delete("category");
    } else {
      newParams.set("category", category.value);
    }
    setSearchParams(newParams);
  };

  const getTodayTasksCount = () => {
    return todos.filter((todo) => todo.category === category.value).length;
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
