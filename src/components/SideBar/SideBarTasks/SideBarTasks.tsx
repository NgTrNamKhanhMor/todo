import { CalendarMonth, FormatListBulleted, KeyboardDoubleArrowRight } from '@mui/icons-material'
import { Chip, IconButton, List, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material'
import React from 'react'

export default function SideBarTasks() {
    return (
        <>
            <Typography variant="h6" gutterBottom>
                Tasks
            </Typography>
            <List>
                <ListItemButton>
                    <ListItemIcon>
                        <KeyboardDoubleArrowRight />
                    </ListItemIcon>
                    <ListItemText primary="Upcoming" />
                    <IconButton edge="end" disableRipple>
                        <Chip label="12" size="small" clickable={false} />
                    </IconButton>
                </ListItemButton>

                <ListItemButton>
                    <ListItemIcon>
                        <FormatListBulleted />
                    </ListItemIcon>
                    <ListItemText primary="Today" />
                    <IconButton edge="end" disableRipple>
                        <Chip label="2" size="small" />
                    </IconButton>
                </ListItemButton>

                <ListItemButton>
                    <ListItemIcon>
                        <CalendarMonth />
                    </ListItemIcon>
                    <ListItemText primary="Calendar" />
                </ListItemButton>
            </List>
        </>
    )
}
