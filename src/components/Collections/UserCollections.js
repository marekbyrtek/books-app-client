import React from 'react';
import { useParams } from 'react-router-dom';

const UserCollections = () => {
  const { user } = useParams();
  
  return (
    <div>UserCollections</div>
  )
}

export default UserCollections;
