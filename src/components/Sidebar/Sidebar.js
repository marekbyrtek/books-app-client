import React, { useContext } from 'react'
import AuthContext from '../../context/AuthContext';
import { ModeContext } from '../../context/ModeContext';
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Switch } from '@mui/material';
import { Home, DarkMode } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import AdminLink from './AdminLink';

const Sidebar = () => {
  const { authState } = useContext(AuthContext);
  const { mode, setMode } = useContext(ModeContext);
  const navigate = useNavigate();

  return (
    <Box flex={1} p={2} sx={{ display: { xs: "none", sm: "block"} }}>
      <Box position="fixed">
          <List>
            <ListItem disablePadding>
              <ListItemButton onClick={() => navigate("/")}>
                <ListItemIcon>
                  <Home />
                </ListItemIcon>
                <ListItemText primary="Homepage" />
              </ListItemButton>
            </ListItem>
            <AdminLink />
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <DarkMode />
                </ListItemIcon>
                <Switch checked={mode === "dark"} onChange={() => setMode(mode === "light" ? "dark" : "light")} />
              </ListItemButton>
            </ListItem>
          </List>
      </Box>
    </Box>
  )
}

export default Sidebar;
