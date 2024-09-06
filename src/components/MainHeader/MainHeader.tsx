import { Clear } from "@mui/icons-material";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import TaskCount from "~components/TaskCount/TaskCount";
import { toPascalCase } from "~helpers/text";

type MainHeaderProps = {
  tasksCount: number;
};

export default function MainHeader({ tasksCount }: MainHeaderProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  const dateQuery = searchParams.get("date") || "";
  const categoryQuery = searchParams.get("category") || "";
  const displayTitle = searchQuery
    ? `Search: ${searchQuery}`
    : categoryQuery
      ? `Category: ${toPascalCase(categoryQuery)}`
      : "Tasks";
  const subtitle = searchQuery && dateQuery ? `Date: ${dateQuery}` : undefined;

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
