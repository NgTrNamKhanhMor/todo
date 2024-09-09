import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Dayjs } from "dayjs";
type MyDatePickerProps = {
    selectedDate: Dayjs | null;
    handleDateChange: (date: Dayjs | null) => void;
};
export default function MyDatePicker({ selectedDate, handleDateChange }: MyDatePickerProps) {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
                value={selectedDate}
                onChange={handleDateChange}
                sx={{width: 1}}
                slotProps={{ textField: { variant: 'outlined' } }}
            />
        </LocalizationProvider>
    )
}
