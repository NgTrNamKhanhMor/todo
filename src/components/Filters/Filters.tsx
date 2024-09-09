import {
  Button,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack
} from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { completions } from "~/const/completions";
import { filterParams } from "~/const/filtersCount";
import { sorts } from "~/const/sorts";
import MyDatePicker from "~components/MyDatePicker/MyDatePicker";

export default function Filters() {
  const [sortOrder, setSortOrder] = useState("none");
  const [completionStatus, setCompletionStatus] = useState("none");
  const [dateFilter, setDateFilter] = useState<Dayjs | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const dateQuery = searchParams.get("date") || "";
  const [isUpcoming, setIsUpcoming] = useState(false);

  const handleSortOrderChange = (event: SelectChangeEvent) => {
    const newValue = event.target.value as string;
    setSortOrder(newValue);

    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set("sort", newValue);
    setSearchParams(newParams);
  };

  const handleCompletionStatusChange = (event: SelectChangeEvent) => {
    const newValue = event.target.value as string;
    setCompletionStatus(newValue);

    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set("completed", newValue);
    setSearchParams(newParams);
  };

  const handleClearAll = () => {
    setSortOrder("none");
    setCompletionStatus("none");
    setDateFilter(null);
    const newParams = new URLSearchParams(searchParams.toString());
    filterParams.forEach((param) => {
      newParams.delete(param);
    });
    setSearchParams(newParams);
  };

  const handleDateChange = (date: Dayjs | null) => {
    setDateFilter(date);

    const newParams = new URLSearchParams(searchParams.toString());
    if (date) {
      newParams.set("date", date.format("YYYY-MM-DD"));
    } else {
      newParams.delete("date");
    }
    setSearchParams(newParams);
  };

  const getDateFromQuery = (dateQuery: string): Dayjs | null => {
    if (dateQuery === "upcoming") {
      setIsUpcoming(true);
    } else {
      setIsUpcoming(false);
    }
    if (dateQuery === "today") {
      return dayjs(new Date());
    } else {

      const parsedDate = dayjs(dateQuery, "YYYY-MM-DD");
      return parsedDate.isValid() ? parsedDate : null;
    }
  };

  useEffect(() => {
    const currentSortOrder = searchParams.get("sort") || "none";
    setSortOrder(currentSortOrder);

    const currentCompletionStatus = searchParams.get("completed") || "none";
    setCompletionStatus(currentCompletionStatus);

    const dateFromParams = searchParams.get("date");
    setDateFilter(getDateFromQuery(dateFromParams || ""));
  }, [searchParams]);

  return (
    <Stack spacing={3}>
      <Grid container spacing={0} columnGap={2} gap={3}>
        <Grid item xs={12} sm={4} md={3}>
          <FormControl fullWidth>
            <InputLabel>Sort by Date</InputLabel>
            <Select
              value={sortOrder}
              onChange={handleSortOrderChange}
              label="Sort by Date"
            >
              <MenuItem value="none">None</MenuItem>
              {sorts.map((sort, index) => (
                <MenuItem value={sort.value} key={index}>{sort.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={4} md={3}>
          <FormControl fullWidth>
            <InputLabel>Filter by Completion</InputLabel>
            <Select
              value={completionStatus}
              onChange={handleCompletionStatusChange}
              label="Filter by Completion"
            >
              <MenuItem value="none">None</MenuItem>
              {completions.map((complete, index) => (
                <MenuItem value={complete.value} key={index}>{complete.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={4} md={3}>
          <MyDatePicker
            selectedDate={dateFilter}
            handleDateChange={handleDateChange}
            isUpcoming={!!isUpcoming}
          />
        </Grid>
        <Grid item xs={12} sm={4} md={2}>
          <Button variant="outlined" onClick={handleClearAll} fullWidth sx={{ height: 1 }}>
            Clear all
          </Button>
        </Grid>
      </Grid>
      <Divider />
    </Stack>
  );
}
