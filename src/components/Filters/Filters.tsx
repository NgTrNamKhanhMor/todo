import {
  Button,
  Divider,
  Grid,
  Stack
} from "@mui/material";
import { useSearchParams } from "react-router-dom";
import { completions } from "~/const/completions";
import { filterParams } from "~/const/filtersCount";
import { sorts } from "~/const/sorts";
import DatePickerFilter from "~components/DatePickerFilter/DatePickerFilter";
import SelectInput from "~components/SelectFilter/SelectFilter";

export default function Filters() {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleClearAll = () => {
    const newParams = new URLSearchParams(searchParams.toString());
    filterParams.forEach((param) => {
      newParams.delete(param);
    });
    setSearchParams(newParams);
  };

  return (
    <Stack spacing={3}>
      <Grid container spacing={0} columnGap={2} gap={3}>
        <Grid item xs={12} sm={4} md={3}>
          <SelectInput type={"sort"} label="Sort by Date" data={sorts} />
        </Grid>

        <Grid item xs={12} sm={4} md={3}>
          <SelectInput type={"completed"} label="Sort by Completion" data={completions} />
        </Grid>

        <Grid item xs={12} sm={4} md={3}>
          <DatePickerFilter />
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
