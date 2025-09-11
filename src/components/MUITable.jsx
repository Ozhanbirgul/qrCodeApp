import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import CircularProgress from "@mui/material/CircularProgress"; //loading spinner için kullanılan component

const MUITable = () => {

    /*const rows = [
        {id : 1, firstName: "Birgül", lastName : "Demirden", age : 26},
        {id : 2, firstName: "Birgül", lastName : "Demirden", age : 26},
        {id :3, firstName: "Birgül", lastName : "Demirden", age : 26},
    ]*/

    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(true); // loading durumunu tutalım

    useEffect(() => {
      axios.get("https://api.ikkutusu.com.tr/api/QrCode")
        .then((response) => {
          //console.log("Api test", response.data)
          //setRows(response.data)
          setRows(response.data.result)
        })
        .catch((error) => {
          console.log("veri çekme hatasi",error)
        })
    },[]);

    if(loading) {
      return(
        <div>
          <CircularProgress />
        </div>
      )
    }

  return (
    <div>
      <TableContainer>
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>İÇERİK</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {rows.map((row) => (
                    <TableRow key={row.id}>
                        <TableCell>{row.id}</TableCell>
                        <TableCell>{row.description}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default MUITable
