import { Close } from '@mui/icons-material';
import { Alert, IconButton, Snackbar } from '@mui/material';
import { SyntheticEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { hideSnackbar } from '~redux/slices/snackbarSlices';
import { RootState } from '~redux/store';

export default function MySnackBar() {
    const dispatch = useDispatch();

    const { open, message, severity } = useSelector((state: RootState) => state.snackbar);

    const handleClose = (event?: Event | SyntheticEvent<any, Event>, reason?: string) => {
        if (reason === "clickaway") {
            return;
        }
        dispatch(hideSnackbar());
    };

    return (
        <Snackbar
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
            <Alert
                severity={severity}
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
                {message}
            </Alert>
        </Snackbar>
    );
}
