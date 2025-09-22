import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import QrCodeDialog from "./QrCodeDialog";
import { useQrCodes } from "../queries/qrCodeQueries";

const MUITable = () => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // useQuery ile veri çekelim
  const { data, isLoading, isError, refetch } = useQrCodes();

  if (isLoading) {
    return <CircularProgress />;
  }

  if (isError) {
    return <div>Veriler alınırken bir hata oluştu.</div>;
  }

  const rows = data?.result || []; // artık queries dosyası response.data döndürüyor

  return (
    <>
      {/* Buton ve Başlık Alanı */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "5px",
          padding: "20px",
        }}
      >
        <h2 style={{ marginBottom: "5px", padding: "20px" }}>QR Kod Listesi</h2>
        <Button variant="contained" onClick={handleClickOpen}>
          + QR Kod Oluştur
        </Button>
      </Box>

      {/* Dialog Alanı */}
      <QrCodeDialog open={open} handleClose={handleClose} onSuccess={refetch} />

      {/* Tablo Alanı */}
      <Box component="section" sx={{ p: 3 }}>
        <TableContainer component={Paper}>
          <Table stickyHeader>
            <TableHead>
              <TableRow style={{ background: "lightgrey" }}>
                <TableCell>ID</TableCell>
                <TableCell>LOKASYON ADI</TableCell>
                <TableCell>ENLEM</TableCell>
                <TableCell>BOYLAM</TableCell>
                <TableCell>KULLANIM ALANI</TableCell>
                <TableCell>AÇIKLAMA</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{
                    "&:nth-of-type(odd)": { backgroundColor: "action.hover" },
                  }}
                >
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.locationName}</TableCell>
                  <TableCell>{row.latitude}</TableCell>
                  <TableCell>{row.longitude}</TableCell>
                  <TableCell>{row.useArea}</TableCell>
                  <TableCell>{row.description}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
};

export default MUITable;
