import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
type RightBarProps = {
  open: boolean;
  onClose: () => void;
  onSubmit: () => void;
  isLoading: boolean,
};
export default function DeleteDialog({
  open,
  onClose,
  onSubmit,
  isLoading,
}: RightBarProps) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title">
        {"Delete Confirmation"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete this? Deleted item can not be
          recovered!
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={onClose} variant="outlined" disabled={isLoading}>
          Cancel
        </Button>
        <Button onClick={onSubmit} autoFocus variant="contained" disabled={isLoading}>
          {isLoading ? (
            <>
              <CircularProgress size={20} sx={{ mr: 1 }} />
              Saving
            </>
          ) : "Delete"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
