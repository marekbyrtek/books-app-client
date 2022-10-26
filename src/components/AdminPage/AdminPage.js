import React, { useEffect, useState, useContext } from 'react';
import { Box, Skeleton, styled, Typography, useMediaQuery, useTheme } from '@mui/material';
import axios from 'axios';
import { ServerContext } from '../../context/ServerContext';
import Toolbar from './Toolbar';
import AdminTable from './AdminTable';
import AdminTableSmall from './AdminTableSmall';

const StyledBox = styled(Box)(({ theme }) => ({
  width: "90%",
  marginBottom: "50px",
  [theme.breakpoints.down("sm")]: {
      width: "100%"
  }
}))

const AdminPage = () => {
  const [listOfUsers, setListOfUsers] = useState(null);
  const [listOfChecked, setListOfChecked] = useState([]);
  const [counter, setCounter] = useState(0);
  const { serverURL } = useContext(ServerContext);
  const theme = useTheme();
  const Table = useMediaQuery(theme.breakpoints.up("md")) ? <AdminTable listOfUsers={listOfUsers} /> : <AdminTableSmall listOfUsers={listOfUsers} />

  useEffect(() => {
    axios.get(`${serverURL}/api/users`)
      .then((res) => {
        setListOfUsers(res.data);
      })
      .catch((err) => {
        return err;
      })
  },[counter])

  if (listOfUsers === null) {
    return (
      <Box
      flex={3}
      p={2}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}
      >
        <StyledBox>
          <Typography variant="h5" sx={{ marginBottom: "10px" }}>Users</Typography>
            <Typography variant='h3'>
              <Skeleton variant="rounded" sx={{ marginBottom: "10px" }} />
              <Skeleton variant="rounded" sx={{ marginBottom: "10px" }} />
              <Skeleton variant="rounded" sx={{ marginBottom: "10px" }} />
              <Skeleton variant="rounded" sx={{ marginBottom: "10px" }} />
          </Typography>
        </StyledBox>
      </Box>
    )
  } else {
    return (
      <Box
        flex={3}
        p={2}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
      }}
      >
        <Toolbar users={listOfChecked} setCounter={setCounter} />
        {Table}
      </Box>
    )
  }
}

export default AdminPage;
