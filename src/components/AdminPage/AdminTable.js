import React from 'react';
import { Box, Typography, useMediaQuery, useTheme, styled, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Checkbox } from '@mui/material';
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

function createData(number, id, email, name, admin, active) {
    return { number, id, email, name, admin, active };
}

const AdminTable = ({ listOfUsers }) => {
    const theme = useTheme();
    const variant = useMediaQuery(theme.breakpoints.up("sm")) ? "h5" : "h6";
    const rows = listOfUsers.map((el, i) => createData(i + 1, el.id, el.email, el.name, el.admin, el.active))

    return (
        <StyledBox>
            <Typography variant={variant} sx={{ marginBottom: "10px" }}><br /></Typography>
            <Typography variant={variant} sx={{ marginBottom: "10px" }}>Users</Typography>
            <TableContainer component={Paper}>
                <Table aria-label="list of users">
                    <TableHead>
                        <TableRow>
                          <StyledTableCell padding="checkbox"><Checkbox /></StyledTableCell>
                          <StyledTableCell>#</StyledTableCell>
                          <StyledTableCell>Name</StyledTableCell>
                          <StyledTableCell>Email</StyledTableCell>
                          <StyledTableCell>Status</StyledTableCell>
                          <StyledTableCell>Admin</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <StyledTableRow key={row.id}>
                                <StyledTableCell padding="checkbox"><Checkbox /></StyledTableCell>
                                <StyledTableCell>{row.number}</StyledTableCell>
                                <StyledTableCell>{row.name}</StyledTableCell>
                                <StyledTableCell>{row.email}</StyledTableCell>
                                <StyledTableCell>{row.active}</StyledTableCell>
                                <StyledTableCell>{row.admin}</StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </StyledBox>
    )
}

export default AdminTable;
