import { Box, Divider, List, Skeleton } from "@mui/material";
import { ITEMSPERPAGE } from "~/const/system";

export default function TodoListSkeleton() {
  return (
    <List sx={{ flexGrow: 1, width: 1 }}>
      {Array.from({ length: ITEMSPERPAGE }).map((_, index) => (
        <Box key={index}>
          <SkeletonTodoItem />
        </Box>
      ))}
    </List>
  );
}

function SkeletonTodoItem() {
  return (
    <Box>
      <Box display="flex" alignItems="center" width={1} padding={1}>
        <Skeleton
          variant="rectangular"
          width={40}
          height={40}
          sx={{ marginRight: 2 }}
        />

        <Box display="flex" flexDirection="column" flexGrow={1}>
          <Skeleton variant="text" width="60%" height={30} />
          <Skeleton variant="text" width="40%" height={20} />
          <Skeleton variant="text" width="30%" height={20} />
        </Box>

        <Skeleton variant="circular" width={40} height={40} />
      </Box>
      <Divider />
    </Box>
  );
}
