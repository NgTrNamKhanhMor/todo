import { Add } from "@mui/icons-material";
import { Chip, List, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material";
import { useState } from "react";
import AddCategoryDialog from "~components/AddCategoryDialog/AddCategoryDialog";
import ColoredBox from "~components/ColoredBox/ColoredBox";

type SideBarCategoriesProps = {
  open: boolean;
};

export default function SideBarCategories({ open }: SideBarCategoriesProps) {
  const [openCategory, setCategoryOpen] = useState(false);

  const handleOpenAddCategoryDialog = () => {
    setCategoryOpen(true);
  };

  const handleCloseAddCategoryDialog = () => {
    setCategoryOpen(false);
  };

  return (
    <>
      <Typography variant="h6" gutterBottom>
        {open ? 'Categories' : 'Tags'}
      </Typography>
      <List>
        <ListItemButton onClick={handleOpenAddCategoryDialog}>
          <ListItemIcon>
              <Add />
          </ListItemIcon>
          {open && <ListItemText primary="Add a category" />}
        </ListItemButton>

        <ListItemButton>
          <ListItemIcon>
              <ColoredBox color={"red"} />
          </ListItemIcon>
          {open && <ListItemText primary="Category 1" />}
          {open && (
              <Chip label="2" size="small" />
          )}
        </ListItemButton>

        <ListItemButton>
          <ListItemIcon>
              <ColoredBox color={"blue"} />
          </ListItemIcon>
          {open && <ListItemText primary="Category 2" />}
          {open && (
              <Chip label="2" size="small" />
          )}
        </ListItemButton>

        <ListItemButton>
          <ListItemIcon>
              <ColoredBox color={"green"} />
          </ListItemIcon>
          {open && <ListItemText primary="Category 3" />}
          {open && (
              <Chip label="2" size="small" />
          )}
        </ListItemButton>

      </List>
      <AddCategoryDialog open={openCategory} onClose={handleCloseAddCategoryDialog} />
    </>
  );
}
