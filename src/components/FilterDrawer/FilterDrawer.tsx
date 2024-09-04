import {
  Button,
  Divider,
  Drawer,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
} from "@mui/material";
import { Dayjs } from "dayjs";
import React, { useState } from "react";
import { FilterOption } from "~/types/filter";
import MyDatePicker from "~components/MyDatePicker/MyDatePicker";

type FilterDrawerProps = {
  open: boolean;
  filter: FilterOption;
  selectedDate: Dayjs | null;
  onSubmit: (filter: FilterOption, date: Dayjs | null) => void;
  onClose: () => void;
};

export default function FilterDrawer({
  open,
  filter,
  selectedDate,
  onSubmit,
  onClose,
}: FilterDrawerProps) {
  const [localFilter, setLocalFilter] = useState<FilterOption>(filter);
  const [localDate, setLocalDate] = useState<Dayjs | null>(selectedDate);

  const handleLocalFilterChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setLocalFilter(event.target.value as FilterOption);
  };

  const handleLocalDateChange = (date: Dayjs | null) => {
    setLocalDate(date);
  };

  const handleSubmit = () => {
    onSubmit(localFilter, localDate);
    onClose();
  };

  return (
    <Drawer
      anchor="bottom"
      open={open}
      onClose={onClose}
      PaperProps={{ sx: { padding: 2 } }}
    >
      <Stack spacing={3}>
        <FormControl>
          <RadioGroup value={localFilter} onChange={handleLocalFilterChange}>
            <FormControlLabel value="none" control={<Radio />} label="None" />
            <FormControlLabel
              value="dateAsc"
              control={<Radio />}
              label="Date Ascending"
            />
            <FormControlLabel
              value="dateDesc"
              control={<Radio />}
              label="Date Descending"
            />
            <FormControlLabel
              value="completed"
              control={<Radio />}
              label="Completed"
            />
            <FormControlLabel
              value="incomplete"
              control={<Radio />}
              label="Incomplete"
            />
          </RadioGroup>
        </FormControl>
        <MyDatePicker
          selectedDate={selectedDate}
          handleDateChange={handleLocalDateChange}
        />
        <Divider />

        <Stack direction="row" spacing={2} justifyContent="space-between">
          <Button variant="outlined" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleSubmit}>
            Save
          </Button>
        </Stack>
      </Stack>
    </Drawer>
  );
}
