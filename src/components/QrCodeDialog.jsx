import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";

const QrCodeDialog = ({open, handleClose}) => {
  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Yeni QR Kod Ekle</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Buradan yeni bir QR kod ekleyebilirsiniz.
          </DialogContentText>

          {/* Form inputları buraya gelecek. */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>İptal</Button>
          <Button onClick={handleClose}>Kaydet</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default QrCodeDialog
