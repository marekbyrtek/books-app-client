import React, { useEffect, useState, useContext } from 'react';
import { Box, Skeleton, styled, Typography, useMediaQuery, useTheme } from '@mui/material';
import axios from 'axios';
import { ServerContext } from '../../context/ServerContext';
import { FormattedMessage } from 'react-intl';
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
  
  useEffect(() => {
    axios.get(`${serverURL}/api/users`)
    .then((res) => {
      setListOfUsers(res.data);
    })
    .catch((err) => {
      return err;
    })
  },[counter])
  
  const handleChange = (e) => {
    const { id, checked } = e.target;
    setListOfChecked([]);
    if (id === "allSelect") {
      let tempUser = listOfUsers.map((el) => {
        return { ...el, isChecked: checked };
      });
      setListOfUsers(tempUser);
    } else {
      let tempUser = listOfUsers.map((el) => {
        return el.idusers === +id ? { ...el, isChecked: checked } : el
      });
      setListOfUsers(tempUser);
    }
  }
  
  const Table = useMediaQuery(theme.breakpoints.up("md")) ?
  <AdminTable listOfUsers={listOfUsers} setListOfChecked={setListOfChecked} handleChange={handleChange} /> :
  <AdminTableSmall listOfUsers={listOfUsers} setListOfChecked={setListOfChecked} handleChange={handleChange} />

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
          <Typography variant="h5" sx={{ marginBottom: "10px" }}><FormattedMessage id="admin-page.header" /></Typography>
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
