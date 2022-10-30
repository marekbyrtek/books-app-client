import React from 'react';
import { Box, Skeleton, Typography, useMediaQuery, useTheme, styled, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { tableCellClasses } from "@mui/material/TableCell";
import { FormattedMessage } from 'react-intl';

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

  function createData(name, collection, author) {
    return { name, collection, author };
  }

const ItemsHome = ({ lastItems }) => {
    const theme = useTheme();
    const variant = useMediaQuery(theme.breakpoints.up("sm")) ? "h5" : "h6";
    
    if (lastItems === null) {
        return(
            <StyledBox>
                <Typography variant={variant}>
                    <FormattedMessage id="home-items.header" />
                    <Skeleton variant="rounded" sx={{ marginBottom: "10px" }}/>
                    <Skeleton variant="rounded" sx={{ marginBottom: "10px" }}/>
                    <Skeleton variant="rounded" sx={{ marginBottom: "10px" }}/>
                    <Skeleton variant="rounded" sx={{ marginBottom: "10px" }}/>
                    <Skeleton variant="rounded" sx={{ marginBottom: "10px" }}/>
                </Typography>
            </StyledBox>
        )
    } else {
        const rows = lastItems.map((el) => createData(el.name, el.collection, el.author))

        return (
            <StyledBox>
                <Typography variant={variant} sx={{ marginBottom: "10px" }}><FormattedMessage id="home-items.header" /></Typography>
                <TableContainer component={Paper}>
                    <Table aria-label="last items">
                        <TableHead>
                        <TableRow>
                            <StyledTableCell><FormattedMessage id="home-items.table1" /></StyledTableCell>
                            <StyledTableCell><FormattedMessage id="home-items.table2" /></StyledTableCell>
                            <StyledTableCell><FormattedMessage id="home-items.table3" /></StyledTableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {rows.map((row) => (
                            <StyledTableRow key={row.name}>
                            <StyledTableCell component="th" scope="row">{row.name}</StyledTableCell>
                            <StyledTableCell>{row.collection}</StyledTableCell>
                            <StyledTableCell>{row.author}</StyledTableCell>
                            </StyledTableRow>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </StyledBox>
        )
    }
}

export default ItemsHome;
