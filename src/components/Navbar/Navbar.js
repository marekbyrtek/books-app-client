import React from 'react';
import { AppBar, styled, Toolbar } from '@mui/material';
import User from './User';
import Search from './Search';
import Sidemenu from './Sidemenu';

const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center"
})

const Navbar = () => {
  return (
    <AppBar position='sticky'>
      <StyledToolbar>
        <Sidemenu />
        <Search />
        <User />
      </StyledToolbar>
    </AppBar>
  )
}

export default Navbar;
