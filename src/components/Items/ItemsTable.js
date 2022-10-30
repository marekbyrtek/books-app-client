import React, { useContext } from 'react';
import { Box, Typography, useMediaQuery, useTheme, styled, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import { tableCellClasses } from "@mui/material/TableCell";
import { Clear } from '@mui/icons-material';
import AuthContext from '../../context/AuthContext';
import { ServerContext } from '../../context/ServerContext';
import axios from 'axios';
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

  function createData(id, name, tags) {
    if (tags === null) {
      return { id, name, tags };
    } else {
      tags = tags.replace(",", ", ");
      return { id, name, tags }
    }
  }

const ItemsTable = ({ listOfItems, setCounter, user }) => {
    const { authState } = useContext(AuthContext);
    const { serverURL } = useContext(ServerContext);
    const theme = useTheme();
    const variant = useMediaQuery(theme.breakpoints.up("sm")) ? "h5" : "h6";
    const rows = listOfItems.map((el) => createData(el.iditems, el.name, el.tags));

    const handleDetele = (id) => {
      axios.post(`${serverURL}/api/items/delete`, { iditems: id })
        .then((resp) => setCounter((prev) => prev + 1))
        .catch((err) => console.log(err))
    }

    return (
        <StyledBox>
            <Typography variant={variant} sx={{ marginBottom: "10px" }}><FormattedMessage id="items.header" /></Typography>
            <TableContainer component={Paper}>
                <Table aria-label="items">
                    <TableHead>
                        <TableRow>
                          <StyledTableCell><FormattedMessage id="home-items.table1" /></StyledTableCell>
                          <StyledTableCell><FormattedMessage id="items.table" /></StyledTableCell>
                          <StyledTableCell align="right"></StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <StyledTableRow key={row.id}>
                              <StyledTableCell component="th" scope="row">{row.name}</StyledTableCell>
                              <StyledTableCell>{row.tags}</StyledTableCell>
                              <StyledTableCell align="right">
                                {(authState.id === user) && (
                                  <IconButton color="error" size='small' sx={{ padding: 0 }} onClick={() => handleDetele(row.id)}>
                                    <Clear />
                                  </IconButton>
                                )}
                              </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </StyledBox>
    )
}

export default ItemsTable;
