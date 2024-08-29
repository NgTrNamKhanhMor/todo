import { Logout, Menu, Search } from '@mui/icons-material';
import { Box, Button, Divider, Drawer, IconButton, ListItem, ListItemIcon, TextField, Typography, useMediaQuery, useTheme } from '@mui/material';
import SideBarCategories from './SideBarCategories/SideBarCategories';
import SideBarTasks from './SideBarTasks/SideBarTasks';

type SideBarProps = {
  open: boolean,
  toggleDrawer: () => void,
}

export default function SideBar({ open, toggleDrawer }: SideBarProps) {
  const theme = useTheme();
  const drawerWidth = 400;
  const collapsedWidth = 150;
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('lg'));
  return (
    <>
      {!isLargeScreen && (
          <Menu onClick={toggleDrawer} sx={{mt: 7, mx: 4}}/>
      )}
      <Drawer
        variant={isLargeScreen ? 'permanent' : 'temporary'}
        anchor="left"
        open={open}
        sx={{
          width: open ? drawerWidth : collapsedWidth,
          '& .MuiDrawer-paper': {
            width: open ? drawerWidth : collapsedWidth,
            transition: theme.transitions.create('width', {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.standard,
            }),
            overflowX: 'hidden',
            display: 'flex',
            height: '100%',
            flexDirection: 'column',
            bgcolor: 'transparent',
            border: 'none',
            boxShadow: 'none',
            justifyContent: 'space-between',
          },
        }}
      >
        <Box
          bgcolor='rgb(244,244,244)'
          m={4}
          py={4}
          px={open ? 4 : 2}
          height="100%"
          display='flex'
          flexDirection='column'
          justifyContent='space-between'
          borderRadius={4}
          sx={{
            transition: theme.transitions.create('width', {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.standard,
            })
          }}
        >
          <Box>
            <Box display="flex" alignItems="center" justifyContent={open ? 'space-between' : 'center'} mb={2}>
              {open && (
                <Typography variant="h5" textTransform='uppercase'>Menu</Typography>
              )}
              <IconButton size="small" onClick={toggleDrawer}>
                <Menu />
              </IconButton>
            </Box>
            <ListItem>
              <ListItemIcon onClick={open ? () => {} : toggleDrawer}>
                <Search />
              </ListItemIcon>
              {open && (
                <TextField
                  placeholder="Search tasks..."
                  variant="outlined"
                  size="small"
                  fullWidth
                />
              )}
            </ListItem>


            <SideBarTasks open={open} />
            <Divider sx={{ my: 3 }} />
            <SideBarCategories open={open} />
          </Box>

          {open && (
            <Box>
              <Button variant="outlined" color="secondary" startIcon={<Logout />}>
                Log Out
              </Button>
            </Box>
          )}
        </Box>
      </Drawer>
    </>

  );
}
