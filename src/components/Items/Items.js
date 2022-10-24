import React, {useState, useContext, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Skeleton, useTheme, useMediaQuery, styled } from '@mui/material';
import axios from 'axios';
import { ServerContext } from '../../context/ServerContext';
import ItemsTable from './ItemsTable';

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
  const { serverURL } = useContext(ServerContext);
  const theme = useTheme();
  const variant = useMediaQuery(theme.breakpoints.up("sm")) ? "h5" : "h6";

  useEffect(() => {
    axios.get(`${serverURL}/api/items/get/${collection}`)
      .then((res) =>{
        setListOfItems(res.data);
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
        <ItemsTable listOfItems={listOfItems} />
      </Box>
    )
  }
}

export default Items;
