import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { useEffect, useState } from "react";
import { TextField } from "@mui/material";
import { useTodosFilter } from "~/hooks/useTodosFilter";

export default function DatePickerFilter() {
    const { date, setFilters } = useTodosFilter();
    const [dateFilter, setDateFilter] = useState<Dayjs | null>(null);
    const [isUpcoming, setIsUpcoming] = useState(false);

    useEffect(() => {
        const parsedDate = getDateFromQuery(date || "");
        setDateFilter(parsedDate);
        setIsUpcoming(date === "upcoming");
    }, [date]);

    const handleDateChange = (date: Dayjs | null) => {
        setDateFilter(date);
        if (date) {
            setFilters({ date: date.format("YYYY-MM-DD") });
        } else {
            setFilters({ date: undefined });
        }
    };

    function getDateFromQuery(dateQuery: string): Dayjs | null {
        if (dateQuery === "today") {
            return dayjs().startOf('day');
        } else {
            const parsedDate = dayjs(dateQuery, "YYYY-MM-DD");
            return parsedDate.isValid() ? parsedDate : null;
        }
    }

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
                label={isUpcoming ? "Upcoming" : "Sort by day"}
                value={dateFilter}
                onChange={handleDateChange}
                sx={{ width: 1 }}
                slotProps={{ textField: { variant: "outlined" } }}
            />
        </LocalizationProvider>
    );
}
