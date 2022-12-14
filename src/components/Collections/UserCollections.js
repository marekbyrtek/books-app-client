import React, { useState, useEffect, useContext } from 'react';
import { ServerContext } from '../../context/ServerContext';
import axios from 'axios';
import { Box } from '@mui/material';
import { useParams } from 'react-router-dom';
import UserCollectionsComponent from './UserCollectionsComponent';

const UserCollections = () => {
  const { user } = useParams();
  const [userCollections, setUserCollections] = useState(null);
  const { serverURL } = useContext(ServerContext);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    axios.get(`${serverURL}/api/collection/user/${user}`)
      .then((res) => {
        setUserCollections(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
  },[counter])
  
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
      <UserCollectionsComponent setCounter={setCounter} userCollections={userCollections} user={user} />
    </Box>
  )
}

export default UserCollections;
