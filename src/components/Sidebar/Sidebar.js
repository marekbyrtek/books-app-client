import React, { useContext } from 'react'
import { ModeContext } from '../../context/ModeContext';
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Switch } from '@mui/material';
import { Home, DarkMode, CollectionsBookmark } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import AdminLink from './AdminLink';

const Sidebar = () => {
  const { mode, setMode } = useContext(ModeContext);
  const navigate = useNavigate();

  return (
    <Box flex={1} p={2} sx={{ display: { xs: "none", sm: "block"} }}>
      <Box position="fixed">
          <List>
            <ListItem>
              <ListItemButton onClick={() => navigate("/")}>
                <ListItemIcon>
                  <Home />
                </ListItemIcon>
                <ListItemText primary="Homepage" />
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton onClick={() => navigate("/collections")}>
                <ListItemIcon>
                  <CollectionsBookmark />
                </ListItemIcon>
                <ListItemText primary="All collections" />
              </ListItemButton>
            </ListItem>
            <AdminLink />
            <ListItem>
              <ListItemButton>
                <ListItemIcon>
                  <DarkMode />
                </ListItemIcon>
                <Switch checked={mode === "dark"} onChange={() => {
                  if (mode === "light") {
                    setMode("dark");
                    localStorage.setItem("mode", "dark")
                  } else {
                    setMode("light");
                    localStorage.setItem("mode", "light")
                  }
                }} />
              </ListItemButton>
            </ListItem>
          </List>
      </Box>
    </Box>
  )
}

export default Sidebar;
