import React, { useContext } from 'react'
import AuthContext from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { Home } from '@mui/icons-material';

const AdminLink = () => {
    const { authState } = useContext(AuthContext);
    const navigate = useNavigate();

    if (authState.isAdmin) {
        return (
            <ListItem disablePadding>
                <ListItemButton onClick={() => navigate("/admin")}>
                    <ListItemIcon>
                        <Home />
                    </ListItemIcon>
                    <ListItemText primary="Admin page" />
                </ListItemButton>
            </ListItem>
        )
    } else {
        return null
    }
}

export default AdminLink;
