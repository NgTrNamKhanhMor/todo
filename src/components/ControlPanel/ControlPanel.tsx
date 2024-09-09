import { Add, FilterList, KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import {
  Badge,
  Box,
  Button,
  Collapse,
  Grid,
  useMediaQuery,
  useTheme
} from "@mui/material";
import { useContext, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { filterParams } from "~/const/filtersCount";
import { TaskContext } from "~/layouts/Layout";
import Filters from "~components/Filters/Filters";
import SearchBar from "~components/SearchBar/SearchBar";

export default function ControlPanel() {
  const theme = useTheme();
  const { openRightBar } = useContext(TaskContext);
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [searchParams] = useSearchParams();
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);

  const activeFilterCount = filterParams.filter(param => {
    const value = searchParams.get(param);
    return value && value.trim() !== "";
  }).length;

  const hasActiveFilters = filterParams.some(param => {
    const value = searchParams.get(param);
    return value && value.trim() !== "";
  });

  return (
    <Box sx={{ p: 3, mb: 3 }}>
      <Grid container spacing={3} alignItems="center">
        <Grid item xs={12} sm="auto">
          <SearchBar />
        </Grid>
        <Grid item xs={6} sm="auto">
          <Badge
            badgeContent={activeFilterCount > 0 ? activeFilterCount : undefined}
            color="primary"
            overlap="rectangular"
            sx={{
              width: "100%",
              "& .MuiBadge-dot": {
                backgroundColor: "transparent",
              },
            }}
          >
            <Button
              variant="outlined"
              color="primary"
              startIcon={<FilterList />}
              endIcon={isAccordionOpen ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
              sx={{
                height: 50,
                width: { xs: "100%", sm: "auto" },
                borderWidth: 1,
                borderColor: "primary.main",
                borderStyle: "solid",
                "&:hover": {
                  borderColor: "primary.main",
                  borderWidth: hasActiveFilters ? 2 : 1,
                },
                "&.MuiButton-outlined": {
                  borderWidth: hasActiveFilters ? 2 : 1,
                },
              }}
              onClick={() => setIsAccordionOpen(!isAccordionOpen)}
            >
              Filter
            </Button>
          </Badge>
        </Grid>
        <Grid item xs={6} sm="auto">
          <Button
            variant="outlined"
            color="primary"
            size="medium"
            startIcon={<Add />}
            sx={{
              height: 50,
              width: { xs: "100%", sm: "auto" },
              "& .MuiButton-startIcon": {
                marginRight: isSmallScreen ? 0 : undefined,
              },
            }}
            onClick={() => openRightBar(null)}
          >
            {!isSmallScreen && "Add New Task"}
          </Button>
        </Grid>
      </Grid>

      <Collapse in={isAccordionOpen}>
        <Box
          sx={{
            mt: 2,
            boxShadow: "none",
            "&::before": {
              display: "none",
            },
          }}
        >
          <Filters />
        </Box>
      </Collapse>
    </Box>
  );
}
