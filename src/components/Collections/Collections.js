import React, { useState, useEffect, useContext } from 'react';
import { ServerContext } from '../../context/ServerContext';
import axios from 'axios';
import { Box } from '@mui/material';
import AllCollections from './AllCollections';

const Collections = () => {
  const [collections, setCollections] = useState(null);
  const { serverURL } = useContext(ServerContext);

  useEffect(() => {
    axios.get(`${serverURL}/api/collection`)
      .then((res) => {
        setCollections(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
  },[])

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
      <AllCollections collections={collections} />
    </Box>
  )
}

export default Collections;
