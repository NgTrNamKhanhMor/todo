import {
  Chip,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
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
  return (
    <ListItemButton alignItems="center">
      <ListItemIcon>
        <ColoredBox color={category.color} />
      </ListItemIcon>
      {open && <ListItemText primary={category.name} />}
      {open && <Chip label={category.count} size="small" />}
    </ListItemButton>
  );
}
