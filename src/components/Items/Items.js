import React from 'react';
import { useParams } from 'react-router-dom';

const Items = () => {
  const { collection } = useParams();
  
  return (
    <div>Items</div>
  )
}

export default Items;
