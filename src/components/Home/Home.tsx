import { Menu } from '@mui/icons-material';
import { Box, IconButton, Grid } from '@mui/material';
import { useState } from 'react';
import Main from '~components/Main/Main';
import RightBar from '~components/RightBar/RightBar';
import SideBar from '~components/SideBar/SideBar';

export default function Home() {
  const [sideBarOpen, setSideBarOpen] = useState(false);
  const [rightBarOpen, setRightBarOpen] = useState(false);

  const toggleSideBar = () => {
    setSideBarOpen(!sideBarOpen);
  };

  const toggleRightBar = () => {
    setRightBarOpen(!rightBarOpen);
  };

  return (
    <Grid container>
      {/* Sidebar */}
      <Grid
        item
        xs={sideBarOpen ? 2 : 0} 
        sx={{
          display: { xs: sideBarOpen ? 'block' : 'none', md: 'block' }, 
          transition: 'width 0.3s ease',
          backgroundColor: '#f5f5f5',
        }}
      >
        <SideBar open={sideBarOpen} toggleDrawer={toggleSideBar} />
      </Grid>

      {/* Main content */}
      <Grid
        item
        xs
        sx={{
          display: 'flex',
          flexDirection: 'column',
          transition: 'margin-right 0.3s ease',
          // marginLeft: sideBarOpen ? '300px' : '0px',
          // marginRight: rightBarOpen ? '300px' : '0px',
        }}
      >
        <Box>
          {!sideBarOpen && (
            <IconButton
              onClick={toggleSideBar}
              sx={{
                position: 'fixed',
                left: 30,
                top: 60,
                zIndex: 1300
              }}
            >
              <Menu />
            </IconButton>
          )}
        </Box>
        <Main />
      </Grid>

      {/* Right Bar */}
      <Grid
        item
        xs={rightBarOpen ? 3 : 0} // Adjust size based on right bar state
        sx={{
          display: { xs: rightBarOpen ? 'block' : 'none', md: 'block' }, // Adjust display based on screen size
          transition: 'width 0.3s ease',
        }}
      >
        <RightBar open={rightBarOpen} toggleDrawer={toggleRightBar} />
      </Grid>
    </Grid>
  );
}
