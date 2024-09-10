import { Close } from '@mui/icons-material';
import { Alert, IconButton, Snackbar } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { clearTodoInfo } from '~redux/slices/todoSlices';
import { clearUserInfo } from '~redux/slices/userSlices';
import { RootState } from '~redux/store';

export function InfoSnackBar() {
    const dispatch = useDispatch();

    const userInfo = useSelector((state: RootState) => state.user.info);
    const todoInfo = useSelector((state: RootState) => state.todos.info);

    const infoMessage = userInfo || todoInfo;
    const isErrorVisible = Boolean(infoMessage);

    const handleClose = () => {
        if (userInfo) dispatch(clearUserInfo());
        if (todoInfo) dispatch(clearTodoInfo());
    };

    return (
        <Snackbar
            open={isErrorVisible}
            autoHideDuration={6000}
            onClose={handleClose}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
            <Alert
                severity="info"
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
                {infoMessage}
            </Alert>
        </Snackbar>
    );
}
