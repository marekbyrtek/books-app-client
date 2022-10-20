import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { ServerContext } from '../../context/ServerContext';
import { Box } from '@mui/material';
import ItemsHome from './ItemsHome';
import CollectionsHome from './CollectionsHome';

const Home = () => {
  const [lastItems, setLastItems] = useState(null);
  const [biggestCollections, setBiggestCollections] = useState(null);
  const { serverURL } = useContext(ServerContext);

  useEffect(() => {
    axios.get(`${serverURL}/api/items/home`)
      .then((res) => {
        setLastItems(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
  },[]);

  useEffect(() => {
    axios.get(`${serverURL}/api/collection/home`)
      .then((res) => {
        setBiggestCollections(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
  },[]);

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
      <ItemsHome lastItems={lastItems} />
      <CollectionsHome biggestCollections={biggestCollections} />
    </Box>
  )
}

export default Home;
