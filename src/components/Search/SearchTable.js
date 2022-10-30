import React from 'react';
import { Typography, styled, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { tableCellClasses } from "@mui/material/TableCell";
import { useNavigate } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

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
    cursor: "pointer",
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

const SearchTable = ({ rows, variant, tag }) => {
    const navigate = useNavigate();

    return (
        <>
            <Typography variant={variant} sx={{ marginBottom: "10px" }}>{tag}:</Typography>
            <TableContainer component={Paper}>
                <Table aria-label="search results">
                    <TableHead>
                    <TableRow>
                        <StyledTableCell><FormattedMessage id="home-items.table1" /></StyledTableCell>
                        <StyledTableCell><FormattedMessage id="home-items.table2" /></StyledTableCell>
                        <StyledTableCell><FormattedMessage id="home-items.table3" /></StyledTableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {rows.map((row) => (
                        <StyledTableRow key={row.idcolection} onClick={(() => navigate(`/items/${row.idcollection}`))}>
                        <StyledTableCell component="th" scope="row">{row.name}</StyledTableCell>
                        <StyledTableCell>{row.collection}</StyledTableCell>
                        <StyledTableCell>{row.author}</StyledTableCell>
                        </StyledTableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}

export default SearchTable;
