import { Add } from "@mui/icons-material";
import { Chip, IconButton, List, ListItemButton, ListItemText, Typography } from "@mui/material";
import ColoredBox from "~components/ColoredBox/ColoredBox";

export default function SideBarCategories() {
    return (
        <>
            <Typography variant="h6" gutterBottom>
                Categories
            </Typography>
            <List>
                <ListItemButton>
                    <IconButton disableRipple>
                        <Add sx={{ marginRight: 1 }} />
                    </IconButton>
                    <ListItemText primary="Add a category" />

                </ListItemButton>
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
        </>
    )
}
