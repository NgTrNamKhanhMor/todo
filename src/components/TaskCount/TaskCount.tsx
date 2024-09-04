import { Box } from "@mui/material";

export default function TaskCount({ tasksCount }) {
  return (
    <Box
      sx={{
        width: 50,
        height: 50,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: "2px solid rgb(244,244,244)",
        borderRadius: "4px",
        fontSize: "2rem",
        fontWeight: "bold",
        color: "black",
        mt: 1,
      }}
    >
      {tasksCount}
    </Box>
  );
}
