import { Close, Logout, Menu, Search } from '@mui/icons-material';
import { Box, Typography, IconButton, TextField, Divider, Button, Drawer, Select, MenuItem, Checkbox, FormControlLabel } from '@mui/material';
import { useState } from 'react';
import SideBarCategories from '~components/SideBar/SideBarCategories/SideBarCategories';
import SideBarTasks from '~components/SideBar/SideBarTasks/SideBarTasks';

export default function RightBar({ open, toggleDrawer }) {
    const [dueDateEnabled, setDueDateEnabled] = useState(false);

    const handleDueDateChange = (event) => {
        setDueDateEnabled(event.target.checked);
    };

    return (
        <Drawer
            variant="persistent"
            anchor="right"
            open={open}
            sx={{
                '& .MuiDrawer-paper': {
                    width: 500,
                    padding: 4,
                    border: 'none',
                },
            }}
        >
            <Box bgcolor='rgb(244,244,244)' p={4} height={1} display='flex' flexDirection='column' justifyContent='space-between' borderRadius={4}>

                <Box >
                    <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
                        <Typography variant="h5" textTransform="uppercase">Task</Typography>
                        <IconButton size="small" onClick={toggleDrawer}>
                            <Close />
                        </IconButton>
                    </Box>

                    <TextField
                        label="Task Name"
                        variant="outlined"
                        size="small"
                        fullWidth
                        sx={{ marginBottom: '20px' }}
                    />

                    <TextField
                        label="Task Description"
                        variant="outlined"
                        size="small"
                        multiline
                        rows={3}
                        fullWidth
                        sx={{ marginBottom: '20px' }}
                    />

                    <Select
                        label="Category"
                        variant="outlined"
                        fullWidth
                        defaultValue=""
                        sx={{ marginBottom: '20px' }}
                    >
                        <MenuItem value="" disabled>Select Category</MenuItem>
                        <MenuItem value="work">Work</MenuItem>
                        <MenuItem value="personal">Personal</MenuItem>
                        <MenuItem value="urgent">Urgent</MenuItem>
                    </Select>

                    <FormControlLabel
                        control={
                            <Checkbox checked={dueDateEnabled} onChange={handleDueDateChange} />
                        }
                        label="Set Due Date"
                        sx={{ marginBottom: '20px' }}
                    />

                    <TextField
                        label="Due Date"
                        type="date"
                        variant="outlined"
                        size="small"
                        fullWidth
                        disabled={!dueDateEnabled}
                        InputLabelProps={{ shrink: true }}
                        sx={{ marginBottom: '20px' }}
                    />
                </Box>


                <Box display="flex" justifyContent="space-between" my={2}>
                    <Button variant="outlined" color="error">Delete Task</Button>
                    <Button variant="contained" color="primary">Save Task</Button>
                </Box>
            </Box>

        </Drawer>
    );
}
