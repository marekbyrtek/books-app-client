import React, { useEffect, useState, useContext } from 'react';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import { DataGrid } from "@mui/x-data-grid";
import axios from 'axios';
import { ServerContext } from '../../context/ServerContext';
import Toolbar from './Toolbar';

const columns = [
  { field: 'number', headerName: '#', width: 70 },
  { field: 'name', headerName: 'Name', width: 160 },
  { field: 'email', headerName: 'Email', width: 160 },
  { field: 'active', headerName: 'Status', width: 100, sortable: false },
  { field: 'admin', headerName: 'Admin', width: 100, sortable: false }
];

const columnsSmall = [
  { field: 'email', headerName: 'Email', width: 160 },
  { field: 'active', headerName: 'Status', width: 100, sortable: false },
  { field: 'admin', headerName: 'Admin', width: 100, sortable: false }
];

const AdminPage = () => {
  const theme = useTheme();
  const [listOfUsers, setListOfUsers] = useState([]);
  const [listOfChecked, setListOfChecked] = useState([]);
  const [pageSize, setPageSize] = useState(20);
  const [counter, setCounter] = useState(0);
  const { serverURL } = useContext(ServerContext);

  useEffect(() => {
    axios.get(`${serverURL}/api/users`)
      .then((res) => {
        const arr = res.data.map((el, i) => {
          return {
            number: i + 1,
            id: el.idusers,
            email: el.email,
            name: el.name,
            admin: el.admin ? "jest" : "nie ma",
            active: el.active ? "active" : "blocked"
          }
        })
        setListOfUsers(arr);
      })
      .catch((err) => {
        return err;
      })
  },[counter])

  return (
    <Box flex={3}>
      <Toolbar users={listOfChecked} setCounter={setCounter} />
      <DataGrid 
        columns={useMediaQuery(theme.breakpoints.up("sm")) ? columns : columnsSmall}
        rows={listOfUsers}
        pageSize={pageSize}
        rowsPerPageOptions={[5, 10, 15, 20]}
        onPageSizeChange={((data) => {
          setPageSize(data);
        })}
        checkboxSelection
        onSelectionModelChange={((data) => {
          setListOfChecked(data);
        })}
      />
    </Box>
  )
}

export default AdminPage;
