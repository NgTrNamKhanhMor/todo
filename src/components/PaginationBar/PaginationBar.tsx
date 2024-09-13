import { Pagination } from "@mui/material";
import { ITEMSPERPAGE } from "~/const/system";
import { useTodosFilter } from "~/hooks/useTodosFilter";
type PaginationBarProps = {
    totalTasks: number;
    currentPage: number;
};
export default function PaginationBar({ totalTasks, currentPage }: PaginationBarProps) {
    const { page, setFilters } = useTodosFilter();
    const handlePageChange = (
        event: React.ChangeEvent<unknown>,
        newPage: number
    ) => {
        setFilters({ page: newPage })
    };
    return (
        <Pagination
            count={Math.ceil(totalTasks / ITEMSPERPAGE)}
            page={currentPage}
            color="primary"
            onChange={handlePageChange}
        />
    )
}
