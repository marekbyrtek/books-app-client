import React, { useContext } from 'react'
import { ModeContext } from '../../context/ModeContext';
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Switch } from '@mui/material';
import { Home, DarkMode, CollectionsBookmark, Translate } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import AdminLink from './AdminLink';
import { FormattedMessage } from 'react-intl';
import localStorageKeys from "../../config/localStorageKeys";
import LanguageContext from "../../context/LanguageContext";
import locales from '../../config/locales';

const Sidebar = () => {
  const { mode, setMode } = useContext(ModeContext);
  const { locale, setLocalization } = useContext(LanguageContext);
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
                <ListItemText primary={<FormattedMessage id="navbar.menu1" />} />
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton onClick={() => navigate("/collections")}>
                <ListItemIcon>
                  <CollectionsBookmark />
                </ListItemIcon>
                <ListItemText primary={<FormattedMessage id="navbar.menu2" />} />
              </ListItemButton>
            </ListItem>
            <AdminLink />
            <ListItem>
              <ListItemButton disabled={locale === locales.EN} onClick={() => setLocalization(locales.EN)}>
                <ListItemIcon>
                  <Translate />
                </ListItemIcon>
                <ListItemText primary="English" />
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton disabled={locale === locales.PL} onClick={() => setLocalization(locales.PL)}>
                <ListItemIcon>
                  <Translate />
                </ListItemIcon>
                <ListItemText primary="Polski" />
              </ListItemButton>
            </ListItem>
            <ListItem>
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
                }} />
              </ListItemButton>
            </ListItem>
          </List>
      </Box>
    </Box>
  )
}

export default Sidebar;
