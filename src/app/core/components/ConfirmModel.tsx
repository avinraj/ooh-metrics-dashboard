import React from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, useTheme } from "@mui/material";

interface ConfirmModalProps {
  open: boolean;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  title?: string;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({ open, message, onConfirm, onCancel, title = "Confirm" }) => {
    const theme = useTheme()
  return (
    <Dialog open={open} onClose={onCancel}>
      <DialogTitle sx={{fontWeight: 'bolder', textAlign: 'center'}}>{title}</DialogTitle>
      <DialogContent>{message}</DialogContent>
      <DialogActions>
        <Button onClick={onCancel} color="error">
          Cancel
        </Button>
        <Button onClick={onConfirm} sx={{color: theme.palette.text.primary}}>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmModal;
