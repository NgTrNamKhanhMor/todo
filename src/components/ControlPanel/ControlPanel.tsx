import { Add, FilterList } from "@mui/icons-material";
import {
  Button,
  Grid,
  MenuItem,
  Select,
  SelectChangeEvent,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import { useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { filters } from "~/const/filters";
import { TaskContext } from "~/layouts/Layout";
import { FilterOption } from "~/types/filter";
import FilterDrawer from "~components/FilterDrawer/FilterDrawer";
import MyDatePicker from "~components/MyDatePicker/MyDatePicker";

export default function ControlPanel() {
  const theme = useTheme();
  const { openRightBar } = useContext(TaskContext);

  const [searchParams, setSearchParams] = useSearchParams();
  const dateQuery = searchParams.get("date") || "";

  const [filter, setFilter] = useState<FilterOption>("none");
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleFilterChange = (event: SelectChangeEvent<string>) => {
    const selectedFilter = event.target.value as FilterOption;
    applyFilter(selectedFilter, selectedDate);
  };

  const handleDateChange = (date: Dayjs | null) => {
    setSelectedDate(date);
    applyFilter(filter, date);
  };

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  const applyFilter = (selectedFilter: FilterOption, date: Dayjs | null) => {
    setFilter(selectedFilter);
    const newParams = new URLSearchParams(searchParams.toString());

    newParams.set("filter", selectedFilter);

    if (dateQuery === "upcoming" || dateQuery === "today") {
      newParams.set("date", dateQuery);
    } else if (date) {
      newParams.set("date", date.format("YYYY-MM-DD"));
    } else {
      newParams.delete("date");
    }

    setSearchParams(newParams);
    setDrawerOpen(false);
  };

  const saveDrawerFilters = (
    drawerFilter: FilterOption,
    drawerDate: Dayjs | null
  ) => {
    applyFilter(drawerFilter, drawerDate);
  };

  const getDateFromQuery = (dateQuery: string): Dayjs | null => {
    const parsedDate = dayjs(dateQuery, "YYYY-MM-DD");
    return parsedDate.isValid() ? parsedDate : null;
  };

  useEffect(() => {
    const currentFilter =
      (searchParams.get("filter") as FilterOption) || "none";
    setFilter(currentFilter);

    const dateFromParams = searchParams.get("date");
    setSelectedDate(getDateFromQuery(dateFromParams || ""));
  }, [searchParams]);

  return (
    <>
      <Grid container spacing={3} my={3} alignItems="center">
        <Grid item xs={12} sm="auto">
          <Button
            variant="outlined"
            color="primary"
            startIcon={<Add />}
            sx={{ height: 50, width: { xs: "100%", sm: "auto" } }}
            onClick={() => openRightBar(null)}
          >
            Add New Task
          </Button>
        </Grid>

        {isSmallScreen ? (
          <Grid item xs={12} sm="auto">
            <Button
              variant="text"
              color="primary"
              startIcon={<FilterList />}
              sx={{ height: 50, width: { xs: "100%", sm: "auto" } }}
              onClick={toggleDrawer(true)}
            >
              Filter
            </Button>
          </Grid>
        ) : (
          <>
            <Grid item xs={12} sm="auto">
              <Select
                value={filter}
                onChange={handleFilterChange}
                label="Filter"
                sx={{ height: 50, width: { xs: "100%", sm: "auto" } }}
              >
                {filters.map((filter, index) => (
                  <MenuItem value={filter.value} key={index}>
                    {filter.name}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} sm="auto">
              <MyDatePicker
                selectedDate={selectedDate}
                handleDateChange={handleDateChange}
              />
            </Grid>
          </>
        )}
      </Grid>
      <FilterDrawer
        open={drawerOpen}
        filter={filter}
        selectedDate={selectedDate}
        onSubmit={saveDrawerFilters}
        onClose={toggleDrawer(false)}
      />
    </>
  );
}
