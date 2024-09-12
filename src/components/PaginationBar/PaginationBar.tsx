import { Pagination } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import { ITEMSPERPAGE } from "~/const/system";
type PaginationBarProps = {
    totalTasks: number;
    currentPage: number;
};
export default function PaginationBar({ totalTasks, currentPage }: PaginationBarProps) {
    const [searchParams, setSearchParams] = useSearchParams();
    const handlePageChange = (
        event: React.ChangeEvent<unknown>,
        newPage: number
    ) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("page", newPage.toString());
        setSearchParams(params);
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
