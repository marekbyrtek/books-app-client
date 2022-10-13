import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, MenuItem, Menu, Button, Tooltip, IconButton, ListItemIcon, ListItemButton, styled } from '@mui/material';
import { AccountCircle, Login, PersonAddAlt } from "@mui/icons-material";

const UserBox = styled(Box)(({ theme }) => ({
    display: "none",
    alignItems: "center",
    gap: "16px",
    [theme.breakpoints.up("sm")]: {
        display: "flex"
    }
}))

const UserIcon = styled(Box)(({ theme }) => ({
    display: "block",
    [theme.breakpoints.up("sm")]: {
        display: "none"
    }
}))

const NotLogedIn = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
  
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <>
            <UserBox>
                <Button color="inherit" variant="outlined" as={Link} sx={{ textDecoration: "none", lineHeight: "inherit" }} to="/login">Sign In</Button>
                <Button color="inherit" variant="outlined" as={Link} sx={{ textDecoration: "none", lineHeight: "inherit" }} to="/register">Register</Button>
            </UserBox>
            <UserIcon>
                <Tooltip title="Account">
                    <IconButton
                        onClick={handleClick}
                        size="small"
                        aria-controls={open ? "account-menu" : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? "true" : undefined}
                    >
                        <AccountCircle fontSize="large" />
                    </IconButton>
                </Tooltip>
                <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    mt: 1.5,
                    '& .MuiAvatar-root': {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                    },
                    '&:before': {
                        content: '""',
                        display: 'block',
                        position: 'absolute',
                        top: 0,
                        right: 16,
                        width: 10,
                        height: 10,
                        bgcolor: 'background.paper',
                        transform: 'translateY(-50%) rotate(45deg)',
                        zIndex: 0,
                    },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                    <MenuItem>
                        <ListItemButton as={Link} to="/login">
                            <ListItemIcon>
                                <Login />
                            </ListItemIcon>
                            Sign In
                        </ListItemButton>
                    </MenuItem>
                    <MenuItem>
                        <ListItemButton as={Link} to="/register">
                            <ListItemIcon>
                                <PersonAddAlt />
                            </ListItemIcon>
                            Register
                        </ListItemButton>
                    </MenuItem>
                </Menu>
            </UserIcon>
        </>
    )
}

export default NotLogedIn;
