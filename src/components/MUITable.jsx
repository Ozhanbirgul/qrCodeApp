import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const MUITable = () => {

    const rows = [
        {id : 1, firstName: "Birgül", lastName : "Demirden", age : 26},
        {id : 2, firstName: "Birgül", lastName : "Demirden", age : 26},
        {id :3, firstName: "Birgül", lastName : "Demirden", age : 26},
    ]
  return (
    <div>
      <TableContainer>
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>FIRSTNAME</TableCell>
                    <TableCell>LASTNAME</TableCell>
                    <TableCell>AGE</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {rows.map((row) => (
                    <TableRow key={row.id}>
                        <TableCell>{row.id}</TableCell>
                        <TableCell>{row.firstName}</TableCell>
                        <TableCell>{row.lastName}</TableCell>
                        <TableCell>{row.age}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default MUITable
