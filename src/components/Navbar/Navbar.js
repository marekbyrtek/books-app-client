import React from 'react';
import { AppBar, styled, Toolbar } from '@mui/material';
import User from './User';
import SearchField from './SearchField';
import Sidemenu from './Sidemenu';

const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
})

const Navbar = () => {
  return (
    <AppBar position='sticky' sx={{ maxHeight: "70px" }}>
      <StyledToolbar>
        <Sidemenu />
        <SearchField />
        <User />
      </StyledToolbar>
    </AppBar>
  )
}

export default Navbar;
