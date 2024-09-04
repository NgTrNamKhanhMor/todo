import { Clear } from "@mui/icons-material";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import TaskCount from "~components/TaskCount/TaskCount";

type MainHeaderProps = {
  tasksCount: number;
  title: URLSearchParams;
};

export default function MainHeader({ tasksCount, title }: MainHeaderProps) {
  const searchQuery = title.get("search") || "";
  const dateQuery = title.get("date") || "";
  const displayTitle = searchQuery
    ? `Search: ${searchQuery}`
    : dateQuery
    ? `Date: ${dateQuery}`
    : "Tasks";
  const subtitle = searchQuery && dateQuery ? `Date: ${dateQuery}` : undefined;
  const [searchParams, setSearchParams] = useSearchParams();

  const handleRemoveDate = () => {
    const newParams = new URLSearchParams(searchParams);
    newParams.delete("date");
    setSearchParams(newParams);
  };
  return (
    <Box>
      <Box display="flex" flexDirection="column" mb={2}>
        <Stack direction="row" gap={2} alignItems="center">
          <Typography variant="h3" component="h1">
            {displayTitle}
          </Typography>
          <TaskCount tasksCount={tasksCount} />
        </Stack>
        {subtitle && (
          <Box display="flex" alignItems="center">
            <Typography variant="h6" component="h2">
              {subtitle}
            </Typography>
            <Button
              variant="outlined"
              color="secondary"
              startIcon={<Clear />}
              onClick={handleRemoveDate}
              sx={{ ml: 2 }}
            >
              Clear
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
}
