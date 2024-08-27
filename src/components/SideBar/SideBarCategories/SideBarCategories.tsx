import { Add } from "@mui/icons-material";
import { Chip, IconButton, List, ListItemButton, ListItemText, Typography } from "@mui/material";
import { useState } from "react";
import AddCategoryDialog from "~components/AddCategoryDialog/AddCategoryDialog";
import ColoredBox from "~components/ColoredBox/ColoredBox";

export default function SideBarCategories() {
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
                Categories
            </Typography>
            <List>
                <ListItemButton onClick={handleOpenAddCategoryDialog}>
                    <IconButton disableRipple>
                        <Add sx={{ marginRight: 1 }} />
                    </IconButton>
                    <ListItemText primary="Add a category" />
                </ListItemButton>
                {/* Existing categories */}
                <ListItemButton>
                    <IconButton disableRipple>
                        <ColoredBox color={"red"} />
                    </IconButton>
                    <ListItemText primary="Category 1" />
                    <IconButton edge="end" disableRipple>
                        <Chip label="2" size="small" />
                    </IconButton>
                </ListItemButton>
                <ListItemButton>
                    <IconButton disableRipple>
                        <ColoredBox color={"blue"} />
                    </IconButton>
                    <ListItemText primary="Category 2" />
                    <IconButton edge="end" disableRipple>
                        <Chip label="2" size="small" />
                    </IconButton>
                </ListItemButton>
                <ListItemButton>
                    <IconButton disableRipple>
                        <ColoredBox color={"green"} />
                    </IconButton>
                    <ListItemText primary="Category 3" />
                    <IconButton edge="end" disableRipple>
                        <Chip label="2" size="small" />
                    </IconButton>
                </ListItemButton>
            </List>
            <AddCategoryDialog open={openCategory} onClose={handleCloseAddCategoryDialog} />
        </>
    )
}
