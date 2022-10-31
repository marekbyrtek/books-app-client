import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, ButtonGroup, Box, useTheme, useMediaQuery } from '@mui/material';
import AuthContext from '../../context/AuthContext';
import { ServerContext } from '../../context/ServerContext';
import axios from 'axios';
import localStorageKeys from "../../config/localStorageKeys";
import { FormattedMessage } from 'react-intl';

const Toolbar = ({ users, setCounter }) => {
    const [loading, setLoading] = useState(false);
    const { authState, setAuthState } = useContext(AuthContext);
    const { serverURL } = useContext(ServerContext);
    const navigate = useNavigate();
    const theme = useTheme();

    const axiosPut = (route, id) => {
        axios.put(`${serverURL}${route}`, {idusers: id})
            .then((res) => res)
            .catch((err) => console.log(err))
    }

    const endRequest = () => {
        setTimeout(() => {
            setCounter((prev) => prev + 1);
            setLoading(false);
        }, 2000)
    }

    const handleBlock = (e) => {
        e.preventDefault();
        setLoading(true);
        users.map((el) => {
            axiosPut("/api/users/block", el)
        })
        if (users.includes(authState.id)) {
            localStorage.removeItem(localStorageKeys.TOKEN);
            setAuthState({
            id: 0,
            email: "",
            name: "",
            isAdmin: false,
            status: false
            })
            navigate("/");
        } else {
            endRequest();
        }
    }

    const handleUnblock = (e) => {
        e.preventDefault();
        setLoading(true);
        users.map((el) => {
            axiosPut("/api/users/activate", el)
        })
        endRequest();
    }

    const handleRemoveAdmin = (e) => {
        e.preventDefault();
        setLoading(true);
        users.map((el) => {
            axiosPut("/api/users/admin/block", el)
        })
        if (users.includes(authState.id)) {
            axios.post(`${serverURL}/api/users/newtoken/${authState.id}`)
                .then((resp) => {
                    localStorage.setItem(localStorageKeys.TOKEN, resp.data.token);
                    setAuthState({ ...authState, isAdmin: false })
                    navigate("/");
                })
                .catch((err) => console.log(err))
        } else {
            endRequest();
        }
    }

    const handleAddAdmin = (e) => {
        e.preventDefault();
        setLoading(true);
        users.map((el) => {
            axiosPut("/api/users/admin/activate", el)
        })
        endRequest();
    }

    const handleDelete = (e) => {
        e.preventDefault();
        setLoading(true);
        users.map((el) => {
            axios.post(`${serverURL}/api/users/delete`, {idusers: el})
                .then((res) => console.log(res))
                .catch((err) => console.log(err))
        })
        if (users.includes(authState.id)) {
            localStorage.removeItem(localStorageKeys.TOKEN);
            setAuthState({
            id: 0,
            email: "",
            name: "",
            isAdmin: false,
            status: false
            })
            navigate("/");
        } else {
            endRequest();
        }
    }

    if (useMediaQuery(theme.breakpoints.up("md"))) {
        return (
            <Box position="fixed">
                <ButtonGroup variant="contained" aria-label="outlined primary button group" size="small">
                    <Button disabled={loading} onClick={handleBlock}><FormattedMessage id="admin-toolbar.button1" /></Button>
                    <Button disabled={loading} onClick={handleUnblock}><FormattedMessage id="admin-toolbar.button2" /></Button>
                    <Button disabled={loading} onClick={handleRemoveAdmin}><FormattedMessage id="admin-toolbar.button3" /></Button>
                    <Button disabled={loading} onClick={handleAddAdmin}><FormattedMessage id="admin-toolbar.button4" /></Button>
                    <Button disabled={loading} onClick={handleDelete}><FormattedMessage id="admin-toolbar.button5" /></Button>
                </ButtonGroup>
            </Box>
        )
    } else {
        return (
            <Box position="fixed" sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <ButtonGroup variant="contained" aria-label="outlined primary button group" size="small" sx={{ marginBottom: "10px" }}>
                    <Button disabled={loading} onClick={handleBlock}><FormattedMessage id="admin-toolbar.button1" /></Button>
                    <Button disabled={loading} onClick={handleUnblock}><FormattedMessage id="admin-toolbar.button2" /></Button>
                    <Button disabled={loading} onClick={handleRemoveAdmin}><FormattedMessage id="admin-toolbar.button3" /></Button>
                </ButtonGroup>
                <ButtonGroup variant="contained" aria-label="outlined primary button group" size="small">
                    <Button disabled={loading} onClick={handleAddAdmin}><FormattedMessage id="admin-toolbar.button4" /></Button>
                    <Button disabled={loading} onClick={handleDelete}><FormattedMessage id="admin-toolbar.button5" /></Button>
                </ButtonGroup>
            </Box>
        )
    }
}

export default Toolbar;
