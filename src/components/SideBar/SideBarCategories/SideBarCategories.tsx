import { Add } from "@mui/icons-material";
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { useState } from "react";
import AddCategoryDialog from "~components/AddCategoryDialog/AddCategoryDialog";
import SideBarCategoryItem from "~components/SideBar/SideBarCategories/SideBarCategoryItem/SideBarCategoryItem";
import categoriesData from "~data/category.json";
type SideBarCategoriesProps = {
  open: boolean;
};

export default function SideBarCategories({ open }: SideBarCategoriesProps) {
  const [openCategory, setCategoryOpen] = useState(false);
  const [categories, setCategories] = useState(categoriesData);
  const handleOpenAddCategoryDialog = () => {
    setCategoryOpen(true);
  };

  const handleCloseAddCategoryDialog = () => {
    setCategoryOpen(false);
  };

  return (
    <>
      <Typography
        variant="h6"
        gutterBottom
        textAlign={open ? "start" : "center"}
      >
        {open ? "Categories" : "Tags"}
      </Typography>
      <List>
        <ListItemButton onClick={handleOpenAddCategoryDialog}>
          <ListItemIcon>
            <Add />
          </ListItemIcon>
          {open && <ListItemText primary="Add a category" />}
        </ListItemButton>

        {categories.map((category, index) => (
          <SideBarCategoryItem key={index} open={open} category={category} />
        ))}
      </List>
      <AddCategoryDialog
        open={openCategory}
        onClose={handleCloseAddCategoryDialog}
      />
    </>
  );
}
