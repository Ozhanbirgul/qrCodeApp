import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Box,
  TextField,
} from "@mui/material";

//Schema tanımı
const schema = z.object({
  locationName: z.string().min(1, "Lokasyon adı Zorunludur."),
  useArea: z.string().min(1, "Kullanım alanı zorunlduur."),
  latitude: z.string().min(1, "Enlem zorunludur."),
  longitude: z.string().min(1, "Boylam zorunludur."),
  description: z.string().optional(),
});

const QrCodeDialog = ({ open, handleClose }) => {
  // useForm ile formu yönetelim
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  // Submit fonksiyonu
  const onSubmit = (data) => {
    console.log("Form verisi:", data);
    // burada api.post("/QrCode/generate", data) yapabiliriz.
    handleClose(); // form submitten sonra diaalog kapanır
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Yeni QR Kod Ekle</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box>
              {/* Lokasyon Adı */}
              <TextField
                label="Lokasyon Adı"
                fullWidth
                variant="outlined"
                {...register("locationName")}
                error={!!errors.locationName}
                sx={{ mb: 2, mt: 2 }}
                helperText={errors.locationName?.message}
              />

              {/* Kullanım Alanı */}
              <TextField
                label="Kullanım Alanı"
                fullWidth
                variant="outlined"
                {...register("useArea")}
                sx={{ mb: 2 }}
                helperText={errors.useArea?.message}
              />

              {/* Lokasyon */}
              <TextField
                label="Enlem"
                fullWidth
                variant="outlined"
                {...register("latitude")}
                error={!!errors.latitude}
                helperText={errors.latitude?.message}
                sx={{ mb: 2 }}
              />

              <TextField
                label="Boylam"
                fullWidth
                variant="outlined"
                {...register("longitude")}
                error={!!errors.longitude}
                helperText={errors.longitude?.message}
                sx={{ mb: 2 }}
              />

              <TextField
                label="Açıklama"
                fullWidth
                variant="outlined"
                {...register("description")}
                sx={{ mb: 2 }}
              />
            </Box>

            <DialogActions>
              <Button onClick={handleClose}>Kapat</Button>
              <Button type="submit" variant="contained">
                Oluştur
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default QrCodeDialog;
