import {
  Button,
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
};
export default function DeleteDialog({
  open,
  onClose,
  onSubmit,
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
        <Button autoFocus onClick={onClose} variant="outlined">
          Cancel
        </Button>
        <Button onClick={onSubmit} autoFocus variant="contained">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}
