import {
  Button,
  Divider,
  Drawer,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
  Typography
} from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { sorts } from "~/const/sorts";
import MyDatePicker from "~components/MyDatePicker/MyDatePicker";

type FilterDrawerProps = {
  open: boolean;
  onClose: () => void;
};

export default function FilterDrawer({
  open,
  onClose,
}: FilterDrawerProps) {
  const [sortFilter, setSortFilter] = useState("none");
  const [dateFilter, setDateFilter] = useState<Dayjs | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const dateQuery = searchParams.get("date") || "";

  const handleSubmit = () => {
    setSortFilter(sortFilter);
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set("sort", sortFilter);
    if (dateFilter) {
      newParams.set("date", dateFilter.format("YYYY-MM-DD"));
    } else if (dateQuery === "upcoming") {
      newParams.set("date", dateQuery);
    } else {
      newParams.delete("date");
    }
    setSearchParams(newParams);
    onClose();
  };

  const handleClearAll = () => {
    setSortFilter("none");
    setDateFilter(null);
    const newParams = new URLSearchParams();
    setSearchParams(newParams);
    onClose();
  };

  const handleClearDate = () => {
    setDateFilter(null);
  };

  const handleSortChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSortFilter(event.target.value);
  };

  const handleDateChange = (date: Dayjs | null) => {
    setDateFilter(date);
  };

  const getDateFromQuery = (dateQuery: string): Dayjs | null => {
    if (dateQuery === "today") {
      return dayjs(new Date())
    } else {
      const parsedDate = dayjs(dateQuery, "YYYY-MM-DD");
      return parsedDate.isValid() ? parsedDate : null;
    }
  };

  useEffect(() => {
    const currentFilter =
      (searchParams.get("sort")) || "none";
    setSortFilter(currentFilter);

    const dateFromParams = searchParams.get("date");
    setDateFilter(getDateFromQuery(dateFromParams || ""));
  }, [searchParams, open]);

  return (
    <Drawer
      anchor="bottom"
      open={open}
      onClose={onClose}
      PaperProps={{ sx: { padding: 2 } }}
    >
      <Stack spacing={3}>
        <FormControl>
          <RadioGroup value={sortFilter} onChange={handleSortChange}>
            {sorts.map((sort, index) => (
              <FormControlLabel
                key={index}
                value={sort.value}
                control={<Radio />}
                label={sort.name}
              />
            ))}
          </RadioGroup>
        </FormControl>
        <Stack spacing={2}>
          <MyDatePicker
            selectedDate={dateFilter}
            handleDateChange={handleDateChange}
          />
          <Button
            variant="outlined"
            onClick={handleClearDate}
          >
            Clear Date
          </Button>
        </Stack>
        <Divider />
        <Stack direction="row" spacing={2} justifyContent="space-between">
          <Button variant="outlined" onClick={handleClearAll}>
            Clear all
          </Button>
          <Button variant="contained" onClick={handleSubmit}>
            Save
          </Button>
        </Stack>
        {dateQuery === "upcoming" && (
          <Typography variant="body2" color="textSecondary">
            Upcoming tasks are currently filtered.
          </Typography>
        )}
      </Stack>
    </Drawer>
  );
}
