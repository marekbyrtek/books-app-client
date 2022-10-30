import React, { useContext } from 'react'
import AuthContext from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { AdminPanelSettings } from '@mui/icons-material';
import { FormattedMessage } from 'react-intl';

const AdminLink = () => {
    const { authState } = useContext(AuthContext);
    const navigate = useNavigate();

    if (authState.isAdmin) {
        return (
            <ListItem>
                <ListItemButton onClick={() => navigate("/admin")}>
                    <ListItemIcon>
                        <AdminPanelSettings />
                    </ListItemIcon>
                    <ListItemText primary={<FormattedMessage id="navbar.menu3" />} />
                </ListItemButton>
            </ListItem>
        )
    } else {
        return null
    }
}

export default AdminLink;
