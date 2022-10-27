import React, { useEffect } from 'react';
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

const AdminTableSmall = ({ listOfUsers, setListOfChecked, handleChange }) => {
    const theme = useTheme();
    const variant = useMediaQuery(theme.breakpoints.up("sm")) ? "h5" : "h6";

    useEffect(() => {
        setListOfChecked([])
        listOfUsers.map((el) => {
            if (el.isChecked === true) setListOfChecked((prev) => [...prev, el.idusers]);
        })
    }, [listOfUsers]);

    return (
        <StyledBox>
            <Typography variant={variant} sx={{ margin: "80px 0 10px" }}>Users</Typography>
            <TableContainer component={Paper}>
                <Table aria-label="list of users">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell padding="checkbox">
                                <Checkbox
                                    id="allSelect"
                                    checked={!listOfUsers.some((user) => user.isChecked !==true)}
                                    onChange={handleChange}
                                />
                            </StyledTableCell>
                            <StyledTableCell>Email</StyledTableCell>
                            <StyledTableCell>Status</StyledTableCell>
                            <StyledTableCell>Admin</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {listOfUsers.map((el) => (
                            <StyledTableRow key={el.idusers}>
                                <StyledTableCell padding="checkbox">
                                    <Checkbox
                                        id={el.idusers}
                                        checked={el.isChecked || false}
                                        onChange={handleChange}
                                    />
                                </StyledTableCell>
                                <StyledTableCell>{el.email}</StyledTableCell>
                                <StyledTableCell>{el.active ? "active" : "blocked"}</StyledTableCell>
                                <StyledTableCell>{el.admin ? "jest" : "nie ma"}</StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </StyledBox>
    )
}

export default AdminTableSmall;
