import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { ServerContext } from '../../context/ServerContext';

const Home = () => {
  const [lastItems, setLastItems] = useState([]);
  const [biggestCollections, setBiggestCollections] = useState([]);
  const {serverURL} = useContext(ServerContext);

  useEffect(() => {
    axios.get(`${serverURL}/api/items/home`)
      .then((res) => {
        setLastItems(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
  },[]);

  useEffect(() => {
    axios.get(`${serverURL}/api/collection/home`)
      .then((res) => {
        setBiggestCollections(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
  },[]);

  return (
    <div>Home</div>
  )
}

export default Home;
