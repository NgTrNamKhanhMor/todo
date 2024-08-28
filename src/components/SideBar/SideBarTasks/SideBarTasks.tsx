import { CalendarMonth, FormatListBulleted, KeyboardDoubleArrowRight } from '@mui/icons-material';
import { Chip, IconButton, List, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';
type SideBarTasksProps = {
    open: boolean;
  };
export default function SideBarTasks({ open }: SideBarTasksProps) {
    return (
        <>
            <Typography variant="h6" gutterBottom mt={2}> 
                Tasks
            </Typography>
            <List>
                <ListItemButton>
                    <ListItemIcon>
                        <KeyboardDoubleArrowRight />
                    </ListItemIcon>
                    {open && (
                        <>
                            <ListItemText primary="Upcoming" />
                            <IconButton edge="end" disableRipple>
                                <Chip label="12" size="small" clickable={false} />
                            </IconButton>
                        </>
                    )}

                </ListItemButton>

                <ListItemButton>
                    <ListItemIcon>
                        <FormatListBulleted />
                    </ListItemIcon>
                    {open && (
                        <>
                            <ListItemText primary="Today" />
                            <IconButton edge="end" disableRipple>
                                <Chip label="12" size="small" clickable={false} />
                            </IconButton>
                        </>
                    )}
                </ListItemButton>

                <ListItemButton>
                    <ListItemIcon>
                        <CalendarMonth />
                    </ListItemIcon>
                    {open && (
                        <ListItemText primary="Today" />
                    )}
                </ListItemButton>
            </List>
        </>
    )
}
