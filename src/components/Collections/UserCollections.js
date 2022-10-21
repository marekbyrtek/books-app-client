import React, { useState, useEffect, useContext } from 'react';
import { ServerContext } from '../../context/ServerContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Box } from '@mui/material';
import { useParams } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import UserCollectionsComponent from './UserCollectionsComponent';

const UserCollections = () => {
  const { user } = useParams();
  const [userCollections, setUserCollections] = useState(null);
  const { serverURL } = useContext(ServerContext);
  const { authState } = useContext(AuthContext);
  const navigate = useNavigate();
  
  // useEffect(() => {
  //   (authState.id != user && authState.isAdmin === false) && navigate("/collections")
  // },[])

  useEffect(() => {
    axios.get(`${serverURL}/api/collection/user/${user}`)
      .then((res) => {
        setUserCollections(res.data);
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
      <UserCollectionsComponent userCollections={userCollections} />
    </Box>
  )
}

export default UserCollections;
