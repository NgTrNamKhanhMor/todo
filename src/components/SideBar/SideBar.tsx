import { Logout, Menu, Search } from "@mui/icons-material";
import {
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { logout } from "~redux/slices/userSlices";
import SideBarCategories from "./SideBarCategories/SideBarCategories";
import SideBarTasks from "./SideBarTasks/SideBarTasks";

type SideBarProps = {
  open: boolean;
  toggleDrawer: () => void;
};

export default function SideBar({ open, toggleDrawer }: SideBarProps) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const drawerWidth = 400;
  const collapsedWidth = 150;
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
  const [searchParams, setSearchParams] = useSearchParams();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const handleSubmitSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const searchValue = formData.get("search") || "";
    const newParams = new URLSearchParams(searchParams.toString());
    if (searchValue) {
      newParams.set("search", searchValue.toString());
    }
    if (typeof searchValue === "string") {
      setSearchParams(newParams);
    }
  };
  return (
    <>
      {!isLargeScreen && <Menu onClick={toggleDrawer} sx={{ mt: 7, mx: 4 }} />}
      <Drawer
        variant={isLargeScreen ? "permanent" : "temporary"}
        anchor="left"
        open={open}
        sx={{
          width: open ? drawerWidth : collapsedWidth,
          "& .MuiDrawer-paper": {
            width: open ? drawerWidth : collapsedWidth,
            transition: theme.transitions.create("width", {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.standard,
            }),
            overflowX: "hidden",
            display: "flex",
            height: "100%",
            flexDirection: "column",
            bgcolor: "transparent",
            border: "none",
            boxShadow: "none",
            justifyContent: "space-between",
          },
        }}
      >
        <Box
          bgcolor="rgb(244,244,244)"
          m={4}
          py={4}
          px={open ? 4 : 2}
          height="100%"
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          borderRadius={4}
        >
          <Box>
            <Box
              display="flex"
              alignItems="center"
              justifyContent={open ? "space-between" : "center"}
              mb={2}
            >
              {open && (
                <Link to={"/"}>
                  <Typography variant="h5" textTransform="uppercase">
                    Menu
                  </Typography>
                </Link>
              )}
              <IconButton size="small" onClick={toggleDrawer}>
                <Menu />
              </IconButton>
            </Box>

            <Box
              component="form"
              onSubmit={handleSubmitSearch}
              sx={{ display: "flex", alignItems: "center" }}
            >
              <IconButton type="submit">
                <Search />
              </IconButton>
              {open && (
                <TextField
                  name="search"
                  placeholder="Search tasks..."
                  variant="outlined"
                  size="small"
                  fullWidth
                  sx={{ marginRight: 1 }}
                />
              )}
            </Box>

            <SideBarTasks open={open} />
            <Divider sx={{ my: 3 }} />
            <SideBarCategories open={open} />
          </Box>

          {open && (
            <Box>
              <Button
                variant="outlined"
                color="secondary"
                startIcon={<Logout />}
                onClick={handleLogout}
              >
                Log Out
              </Button>
            </Box>
          )}
        </Box>
      </Drawer>
    </>
  );
}
