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
import { useDeleteQrCode, useQrCodes } from "../queries/qrCodeQueries";
import { Checkbox } from "@mui/material";
import Header from "./Header"

const MUITable = () => {
  const [open, setOpen] = useState(false);
  const [editQr, setEditQr] = useState(null);
  // Çoklu silme için seçim state'i
  const [selectedIds, setSelectedIds] = useState([]);
  const [selectionMode, setSelectionMode] = useState(false);

  
  // Checkbox seçimi
  const handleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  // Tümünü seç / kaldır
  const handleSelectAll = () => {
    if (selectedIds.length === rows.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(rows.map((row) => row.id));
    }
  };

  const handleClickOpen = () => setOpen(true);
  const { mutate: deleteQr } = useDeleteQrCode();

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
    if (window.confirm("Bu Qr kodunu silmek istediğinizden emin misiniz?")) {
      deleteQr(id, {
        onSuccess: () => {
          alert("QR kod silindi!");
          refetch(); // tablonun yenilenmesi için
        },
        onError: (err) => {
          console.error("Silme hatası: ", err.response);
          alert("Silme işlemi başarısız: " + err.message);
        },
      });
    }
  };

  const handleDeleteSelected = () => {
  if(window.confirm("Seçili QR kodlarını silmek istediğinizden emin misiniz?")) {
    selectedIds.forEach((id) => {
      deleteQr(id, {
        onSuccess: () => {
          refetch(); // Tablonun güncellenmesi
        },
        onError: (err) => {
          console.error("Silme hatası:", err);
        }
      });
    });
    setSelectedIds([]); // seçimleri temizle
    setSelectionMode(false); // seçim modunu kapat
  }
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
        <Box>
          {selectionMode && selectedIds.length > 0 && (
            <Button
              variant="contained"
              color="error"
              onClick={handleDeleteSelected}
              sx={{ ml: 2 }}
            >
              Seçilenleri Sil
            </Button>
          )}

          <Button
            variant="outlined"
            sx={{ mr: 2 }}
            onClick={() => setSelectionMode(!selectionMode)}
          >
            Çoklu Seçim
          </Button>
        </Box>
        <Button variant="contained" onClick={handleClickOpen}>
          + QR Kod Oluştur
        </Button>

        <Header />
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
                <TableCell padding="checkbox">
                  {selectionMode && (
                    <Checkbox
                      indeterminate={
                        selectedIds.length > 0 &&
                        selectedIds.length < rows.length
                      }
                      checked={
                        rows.length > 0 && selectedIds.length === rows.length
                      }
                      onChange={handleSelectAll}
                    />
                  )}
                </TableCell>
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
                  <TableCell padding="checkbox">
                    {selectionMode && (
                      <Checkbox
                        checked={selectedIds.includes(row.id)}
                        onChange={() => handleSelect(row.id)}
                      />
                    )}
                  </TableCell>
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
