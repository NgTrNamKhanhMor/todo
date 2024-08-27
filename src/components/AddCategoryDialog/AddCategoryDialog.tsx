import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material";
import { useState } from "react";
type RightBarProps = {
  open: boolean,
  onClose: ()=> void,
}
export default function AddCategoryDialog({open, onClose}: RightBarProps) {
  console.log(open)
    return (
        <Dialog
          open={open}
          onClose={onClose}
        >
          <DialogTitle>Add a Category</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To subscribe to this website, please enter your email address here. We
              will send updates occasionally.
            </DialogContentText>
            <TextField
              autoFocus
              required
              margin="dense"
              id="category"
              name="category"
              label="Category"
              type="text"
              fullWidth
              variant="standard"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose}>Cancel</Button>
            <Button type="submit">Save</Button>
          </DialogActions>
        </Dialog>
    );
}
