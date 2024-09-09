import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";


export default function DatePickerFilter() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [dateFilter, setDateFilter] = useState<Dayjs | null>(null);
    const [isUpcoming, setIsUpcoming] = useState(false);
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
    useEffect(() => {
        const dateFromParams = searchParams.get("date");
        setDateFilter(getDateFromQuery(dateFromParams || ""));
    }, [searchParams]);

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
