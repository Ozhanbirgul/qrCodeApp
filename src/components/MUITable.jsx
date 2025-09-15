import React, { useState, useEffect } from "react";
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
  DialogActions
} from "@mui/material";
import api from "../api/axios";

const MUITable = () => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true); // loading durumunu tutalım
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  useEffect(() => {
    setTimeout(() => {
      api
        .get("/QrCode")
        .then((response) => {
          setRows(response.data.result);
          setLoading(false);
        })
        .catch((error) => {
          alert("veri çekme hatasi", error.message);
          setLoading(false);
        });
    }, 2000);
  }, []);

  if (loading) {
    return (
      <div>
        <CircularProgress />
      </div>
    );
  }

  return (
    <>
      {/* Buton ve Başlık Alanı */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "5px", padding: "20px" }}>
        <h2 style={{ marginBottom: "5px", padding: "20px" }}>QR Kod Listesi</h2>
        <Button variant="contained" onClick={handleClickOpen}>
          Yeni QR Kod
        </Button>
      </Box>

      {/* Dialog Alanı */}
      <Dialog>
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


      {/* Tablo Alanı */}
      <Box
        component="section"
        sx={{ p:3 }}
      >
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
                  sx={{ "&:nth-of-type(odd)": { backgroundColor: "action.hover" } }}
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
