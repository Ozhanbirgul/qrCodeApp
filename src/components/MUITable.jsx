import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress"; //loading spinner için kullanılan component
import Box from "@mui/material/Box";

const MUITable = () => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true); // loading durumunu tutalım

  useEffect(() => {
    setTimeout(() => {
      axios
        .get("https://api.ikkutusu.com.tr/api/QrCode")
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
      <h2 style={{ marginBottom: "5px", padding: "20px" }}>QR Kod Listesi</h2>
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
