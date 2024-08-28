import { Add } from '@mui/icons-material';
import { Box, Button, Typography } from '@mui/material';
import { openRightBar } from '~/types/openRightBar';
import { Task } from '~/types/task';
type MainHeaderProps = {
    tasks: Task[],
    openRightBar: openRightBar;
  }
export default function MainHeader({tasks, openRightBar}: MainHeaderProps) {
    return (
        <Box>
            <Box display="flex" alignItems="center" mb={2} width={1}>
                <Typography variant="h3" component="h1">
                    Today
                </Typography>
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
                        ml: 2,
                    }}
                >
                    {tasks.length}
                </Box>
            </Box>

            <Button
                variant="outlined"
                color="primary"
                startIcon={<Add />}
                sx={{ mb: 3 }}
                onClick={() => openRightBar(null)}
            >
                Add New Task
            </Button>
        </Box>
    )
}
