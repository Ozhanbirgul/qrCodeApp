import React from 'react';
import { useForm } from 'react-hook-form';
import z from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Box,
  TextField
} from "@mui/material";

//Schema tanımı
const schema = z.object({
  locatinName: z.string().min(1, "Lokasyon adı Zorunludur."),
  useArea: z.string.min(1, "Kullanım alanı zorunlduur."),
  latitude: z.string(1, "Enlem zorunludur."),
  longitude: z.string().min(1, "Boylam zorunludur."),
  description: z.string().optional()
});

const QrCodeDialog = ({open, handleClose}) => {
  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Yeni QR Kod Ekle</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1}}>
            {/* Lokasyon Adı */}
            <TextField 
              label="Lokasyon Adı"
              fullWidth
              variant='outlined'
            />

            {/* Kullanım Alanı */}
            <TextField 
              label="Kullanım Alanı"
              fullWidth
              variant='outlined'
            />

            {/* Lokasyon */}
            <Box>
              <TextField 
                label="Enlem"
                fullWidth
                variant='outlined'
                sx={{mb:2}}
              />
              <TextField 
                label="Boylam"
                fullWidth
                variant='outlined'
                sx={{mb:2}}
              />
            </Box>
          </DialogContentText>

          {/* Form inputları buraya gelecek. */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Kapat</Button>
          <Button onClick={handleClose}>Oluştur</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default QrCodeDialog
