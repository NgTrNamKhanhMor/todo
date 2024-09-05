import {
  Chip,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useSearchParams } from "react-router-dom";
import { Category } from "~/types/category";
import ColoredBox from "~components/ColoredBox/ColoredBox";
import { getTodosByUserId } from "~helpers/todos";
import { selectCurrentUser } from "~helpers/user";

type SideBarCategoryItemProps = {
  open: boolean;
  category: Category;
};

export default function SideBarCategoryItem({
  open,
  category,
}: SideBarCategoryItemProps) {
  const currentUser = selectCurrentUser();
  const tasks = getTodosByUserId(currentUser!.id);
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
    return tasks.filter((task) => task.category === category.value).length;
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
