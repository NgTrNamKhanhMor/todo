import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Dayjs } from "dayjs";

type MyDatePickerProps = {
    selectedDate: Dayjs | null;
    handleDateChange: (date: Dayjs | null) => void;
    isUpcoming: boolean;
};

export default function MyDatePicker({ selectedDate, handleDateChange, isUpcoming }: MyDatePickerProps) {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
                label={isUpcoming ? "Upcoming" : "Sort by day"}
                value={selectedDate}
                onChange={handleDateChange}
                sx={{ width: 1 }}
                slotProps={{ textField: { variant: "outlined" } }}
            />
        </LocalizationProvider>
    );
}
