import React, {useState, useContext, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Skeleton, useTheme, useMediaQuery, styled, Button } from '@mui/material';
import axios from 'axios';
import AuthContext from '../../context/AuthContext';
import { ServerContext } from '../../context/ServerContext';
import ItemsTable from './ItemsTable';
import AddItem from './AddItem';

const StyledBox = styled(Box)(({ theme }) => ({
  width: "90%",
  marginBottom: "50px",
  [theme.breakpoints.down("sm")]: {
      width: "100%"
  }
}))

const Items = () => {
  const { collection } = useParams();
  const [listOfItems, setListOfItems] = useState(null);
  const [counter, setCounter] = useState(0);
  const [user, setUser] = useState(null);
  const { serverURL } = useContext(ServerContext);
  const { authState } = useContext(AuthContext);
  const theme = useTheme();
  const variant = useMediaQuery(theme.breakpoints.up("sm")) ? "h5" : "h6";
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    axios.get(`${serverURL}/api/items/get/${collection}`)
      .then((res) =>{
        setListOfItems(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
  },[counter])

  useEffect(() => {
    axios.get(`${serverURL}/api/items/user/${collection}`)
      .then((res) => {
        setUser(res.data[0].user);
      })
      .catch((err) => {
        console.log(err);
      })
  },[])
  
  if (listOfItems === null) {
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
          <Typography variant={variant} sx={{ marginBottom: "10px" }}>Items</Typography>
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
        {/* {(authState.id === user) && <Button onClick={handleOpen}>Add item</Button>} */}
        <Button onClick={handleOpen}>Add item</Button>
        <AddItem open={open} handleClose={handleClose} collection={collection} setCounter={setCounter} />
        <ItemsTable listOfItems={listOfItems} />
      </Box>
    )
  }
}

export default Items;
