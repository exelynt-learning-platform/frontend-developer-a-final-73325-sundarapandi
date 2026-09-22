import {
  Button, Dialog, DialogActions, DialogContent,
  DialogContentText, DialogTitle
} from "@mui/material";

export default function ConfirmDialog({
  open,
  title = "Confirm action",
  message,
  confirmText = "Confirm",
  loading = false,
  onClose,
  onConfirm
}) {
  return (
    <Dialog open={open} onClose={loading ? undefined : onClose} fullWidth maxWidth="xs">
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{message}</DialogContentText>
      </DialogContent>
      <DialogActions sx={{ p: 2 }}>
        <Button onClick={onClose} disabled={loading}>Cancel</Button>
        <Button onClick={onConfirm} color="error" variant="contained" disabled={loading}>
          {loading ? "Deleting..." : confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
