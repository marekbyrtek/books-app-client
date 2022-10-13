import React from 'react'
import { Box, styled } from '@mui/material';
import { MoreVert } from '@mui/icons-material';

const MenuBox = styled(Box)(({ theme }) => ({
    display: "block",
    [theme.breakpoints.up("sm")]: {
        display: "none"
    }
}))

const Sidemenu = () => {
  return (
    <MenuBox>
        <MoreVert />
    </MenuBox>
  )
}

export default Sidemenu;
