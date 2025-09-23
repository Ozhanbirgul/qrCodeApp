import React, { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
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
  Stack,
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
  const [editQr, setEditQr] = useState(null);

  const handleClickOpen = () => setOpen(true);

  // useQuery ile veri çekelim
  const { data, isLoading, isError, refetch } = useQrCodes();

  if (isLoading) {
    return <CircularProgress />;
  }

  if (isError) {
    return <div>Veriler alınırken bir hata oluştu.</div>;
  }

  const rows = data?.result || []; // artık queries dosyası response.data döndürüyor

  const handleEdit = (row) => {
    setEditQr(row); //seçilen QR verisini state'e atıyoruz.
  };

  const handleDelete = (id) => {
    // burada useDeleteQrCode mutation çağıracağız
    console.log("Silinecek id:", id);
  };

  const handleClose = () => {
    setOpen(false);
    setEditQr(null);
  };

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
      <QrCodeDialog
        open={open || Boolean(editQr)}
        handleClose={handleClose}
        initialData={editQr}
        mode={editQr ? "edit" : "create"}
        onSuccess={refetch}
      />

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
                <TableCell>İŞLEMLER</TableCell>
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
                  <TableCell>
                    <Stack
                      direction="row"
                      justifyContent="center"
                      alignItems="center"
                      spacing={1}
                    >
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => handleEdit(row)}
                        sx={{ minWidth: "auto", padding: "4px" }}
                      >
                        <EditIcon fontSize="small" />
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        size="small"
                        onClick={() => handleDelete(row.id)}
                        sx={{ minWidth: "auto", padding: "4px" }}
                      >
                        <DeleteIcon />
                      </Button>
                    </Stack>
                  </TableCell>
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
