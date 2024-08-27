import { Logout, Menu, Search } from '@mui/icons-material';
import { Box, Typography, IconButton, TextField, Divider, Button, Drawer } from '@mui/material';
import SideBarTasks from './SideBarTasks/SideBarTasks';
import SideBarCategories from './SideBarCategories/SideBarCategories';
type SideBarProps = {
  open: boolean,
  toggleDrawer: ()=> void,
}
export default function SideBar({ open, toggleDrawer }:SideBarProps) {

    return (
        <Drawer
          variant="persistent"
          anchor="left"
          open={open}
          sx={{
            '& .MuiDrawer-paper': {
              padding: 4,
              border: 'none',
            },
          }}
        >
          <Box bgcolor='rgb(244,244,244)' p={4} height={1} display='flex' flexDirection='column' justifyContent='space-between' borderRadius={4}>
            <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
              <Typography variant="h5" textTransform='uppercase'>Menu</Typography>
              <IconButton size="small" onClick={toggleDrawer}>
                <Menu />
              </IconButton>
            </Box>
    
            <TextField
              placeholder="Search tasks..."
              variant="outlined"
              size="small"
              InputProps={{
                startAdornment: <Search sx={{ mr: 1 }} />,
              }}
              sx={{ marginBottom: '20px' }}
            />
    
            <SideBarTasks />
    
            <Divider sx={{ margin: '20px 0' }} />
    
            <SideBarCategories />
    
            <Box mt="auto">
              <Button variant="outlined" color="secondary" startIcon={<Logout />}>
                Log Out
              </Button>
            </Box>
          </Box>
        </Drawer>
      );
}
