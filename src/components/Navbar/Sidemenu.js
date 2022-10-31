import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ModeContext } from '../../context/ModeContext';
import AuthContext from '../../context/AuthContext';
import { Box, styled, Tooltip, IconButton, Menu, MenuItem, ListItemButton, ListItemIcon, Switch } from '@mui/material';
import { MoreVert, Home, DarkMode, CollectionsBookmark, AdminPanelSettings, Translate } from '@mui/icons-material';
import { FormattedMessage } from 'react-intl';
import localStorageKeys from "../../config/localStorageKeys";
import LanguageContext from '../../context/LanguageContext';
import locales from '../../config/locales';

const MenuBox = styled(Box)(({ theme }) => ({
    display: "block",
    [theme.breakpoints.up("sm")]: {
        display: "none"
    }
}))

const Sidemenu = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const navigate = useNavigate();
    const { mode, setMode } = useContext(ModeContext);
    const { authState } = useContext(AuthContext);
    const { locale, setLocalization } = useContext(LanguageContext);
  
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <MenuBox>
            <Tooltip title="Side menu">
                <IconButton
                    color="inherit"
                    onClick={handleClick}
                    size="small"
                    aria-controls={open ? "account-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                >
                    <MoreVert />
                </IconButton>
            </Tooltip>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
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
                        left: 10,
                        width: 10,
                        height: 10,
                        bgcolor: 'background.paper',
                        transform: 'translateY(-50%) rotate(45deg)',
                        zIndex: 0,
                    },
                    },
                }}
                transformOrigin={{ horizontal: 'left', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
                >
                    <MenuItem>
                        <ListItemButton onClick={() => navigate("/")}>
                            <ListItemIcon>
                                <Home />
                            </ListItemIcon>
                            <FormattedMessage id="navbar.menu1" />
                        </ListItemButton>
                    </MenuItem>
                    <MenuItem>
                        <ListItemButton onClick={() => navigate("/collections")}>
                            <ListItemIcon>
                                <CollectionsBookmark />
                            </ListItemIcon>
                            <FormattedMessage id="navbar.menu2" />
                        </ListItemButton>
                    </MenuItem>
                    {authState.isAdmin && (<MenuItem>
                        <ListItemButton onClick={() => navigate("/admin")}>
                            <ListItemIcon>
                                <AdminPanelSettings />
                            </ListItemIcon>
                            <FormattedMessage id="navbar.menu3" />
                        </ListItemButton>
                    </MenuItem>)}
                    <MenuItem>
                        <ListItemButton disabled={locale === locales.EN} onClick={() => setLocalization(locales.EN)}>
                            <ListItemIcon>
                                <Translate />
                            </ListItemIcon>
                            English
                        </ListItemButton>
                    </MenuItem>
                    <MenuItem>
                        <ListItemButton disabled={locale === locales.PL} onClick={() => setLocalization(locales.PL)}>
                            <ListItemIcon>
                                <Translate />
                            </ListItemIcon>
                            Polski
                        </ListItemButton>
                    </MenuItem>
                    <MenuItem>
                        <ListItemButton>
                            <ListItemIcon>
                                <DarkMode />
                            </ListItemIcon>
                            <Switch checked={mode === "dark"} onChange={() => {
                                if (mode === "light") {
                                    setMode("dark");
                                    localStorage.setItem(localStorageKeys.MODE, "dark")
                                } else {
                                    setMode("light");
                                    localStorage.setItem(localStorageKeys.MODE, "light")
                                }
                            }}
                            />
                        </ListItemButton>
                    </MenuItem>
                </Menu>
        </MenuBox>
    )
}

export default Sidemenu;
