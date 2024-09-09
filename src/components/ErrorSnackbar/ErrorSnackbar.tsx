import { Close } from '@mui/icons-material';
import { Alert, IconButton, Snackbar } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { resetTodoError } from '~redux/slices/todoSlices';
import { resetUserError } from '~redux/slices/userSlices';
import { RootState } from '~redux/store';

export function ErrorSnackBar() {
    const dispatch = useDispatch();

    const userError = useSelector((state: RootState) => state.user.error);
    const todoError = useSelector((state: RootState) => state.todos.error);

    const errorMessage = userError || todoError;
    const isErrorVisible = Boolean(errorMessage);

    const handleClose = () => {
        if (userError) dispatch(resetUserError());
        if (todoError) dispatch(resetTodoError());
    };

    return (
        <Snackbar
            open={isErrorVisible}
            autoHideDuration={6000}
            onClose={handleClose}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
            <Alert
                severity="error"
                onClose={handleClose}
                action={
                    <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"
                        onClick={handleClose}
                    >
                        <Close fontSize="inherit" />
                    </IconButton>
                }
                sx={{ width: "100%" }}
            >
                {errorMessage}
            </Alert>
        </Snackbar>
    );
}
