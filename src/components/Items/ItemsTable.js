import React from 'react';
import { Box, Typography, useMediaQuery, useTheme, styled, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { tableCellClasses } from "@mui/material/TableCell";

const StyledBox = styled(Box)(({ theme }) => ({
    width: "90%",
    marginBottom: "50px",
    [theme.breakpoints.down("sm")]: {
        width: "100%"
    }
}))

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  function createData(name, tags) {
    if (tags === null) {
      return { name, tags };
    } else {
      tags = tags.replace(",", ", ");
      return { name, tags }
    }
  }

const ItemsTable = ({ listOfItems }) => {
    const theme = useTheme();
    const variant = useMediaQuery(theme.breakpoints.up("sm")) ? "h5" : "h6";
    const rows = listOfItems.map((el) => createData(el.name, el.tags));

    return (
        <StyledBox>
            <Typography variant={variant} sx={{ marginBottom: "10px" }}>Last items:</Typography>
            <TableContainer component={Paper}>
                <Table aria-label="last items">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Name</StyledTableCell>
                            <StyledTableCell>Tags</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <StyledTableRow key={row.name}>
                            <StyledTableCell component="th" scope="row">{row.name}</StyledTableCell>
                            <StyledTableCell>{row.tags}</StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </StyledBox>
    )
}

export default ItemsTable;
