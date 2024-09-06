import { Box, Stack, Typography } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import TaskCount from "~components/TaskCount/TaskCount";
import { toPascalCase } from "~helpers/text";

type MainHeaderProps = {
  tasksCount: number;
};

export default function MainHeader({ tasksCount }: MainHeaderProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryQuery = searchParams.get("category") || "";
  const displayTitle = categoryQuery
    ? `Category: ${toPascalCase(categoryQuery)}`
    : "Tasks";
  return (
    <Box>
      <Box display="flex" flexDirection="column" mb={2}>
        <Stack direction="row" gap={2} alignItems="center">
          <Typography variant="h3" component="h1">
            {displayTitle}
          </Typography>
          <TaskCount tasksCount={tasksCount} />
        </Stack>
      </Box>
    </Box>
  );
}
