import { Button, Dialog, DialogActions, DialogContent, useTheme } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";

interface ConfirmModalProps {
  open: boolean;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({ open, message, onConfirm, onCancel}) => {
    const theme = useTheme()
    const { t } = useTranslation();
  return (
    <Dialog open={open} onClose={onCancel}>
      {/* <DialogTitle sx={{fontWeight: 'bolder', textAlign: 'center'}}>{title}</DialogTitle> */}
      <DialogContent>{message}</DialogContent>
      <DialogActions>
        <Button onClick={onCancel} color="error">
        {t("sideBar.cancel")}
        </Button>
        <Button onClick={onConfirm} sx={{color: theme.palette.text.primary}}>
        {t("sideBar.confirm")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmModal;
