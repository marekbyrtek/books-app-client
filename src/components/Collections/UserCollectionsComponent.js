import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import { ServerContext } from '../../context/ServerContext';
import { Box, Skeleton, Typography, useMediaQuery, useTheme, styled, Paper, Button, Card, CardContent, CardActions, IconButton } from '@mui/material';
import { Add, Clear } from '@mui/icons-material';
import Grid from "@mui/material/Unstable_Grid2";
import AddCollection from './AddCollection';
import axios from 'axios';
import { FormattedMessage } from 'react-intl';

const StyledBox = styled(Box)(({ theme }) => ({
    width: "90%",
    [theme.breakpoints.down("sm")]: {
        width: "100%"
    }
}))

const UserCollectionsComponent = ({ setCounter, userCollections, user }) => {
    const navigate = useNavigate();
    const { authState } = useContext(AuthContext);
    const { serverURL } = useContext(ServerContext);
    const theme = useTheme();
    const variant = useMediaQuery(theme.breakpoints.up("sm")) ? "h4" : "h5";
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleDetele = (id) => {
        axios.post(`${serverURL}/api/collection/delete`, { idcollection: id })
        .then((resp) => setCounter((prev) => prev + 1))
        .catch((err) => console.log(err))
    }

    if (userCollections === null) {
        return (
            <StyledBox>
                <Typography variant={variant} sx={{ marginBottom: "10px" }}>{authState.name}</Typography>
                <Typography variant='h1'>
                    <Skeleton variant="rounded" sx={{ marginBottom: "10px" }} />
                    <Skeleton variant="rounded" sx={{ marginBottom: "10px" }} />
                    <Skeleton variant="rounded" sx={{ marginBottom: "10px" }} />
                    <Skeleton variant="rounded" sx={{ marginBottom: "10px" }} />
                </Typography>
            </StyledBox>
        )
    } else {
        return (
            <StyledBox>
                <Typography variant={variant} sx={{ marginBottom: "10px" }}>{authState.name}</Typography>
                <Grid container spacing={{ xs: 2, sm: 3 }} columns={{ xs: 4, md: 8 }}>
                    {userCollections.map((el) => (
                        <Grid xs={4} md={4} key={el.idcollection}>
                            <Paper elevation="4">
                                <Card sx={{ display: "flex", justifyContent: "space-between" }}>
                                    <CardContent>
                                        <Typography variant={variant}>{el.name}</Typography>
                                        <Typography color="text.secondary">{el.topic}</Typography>
                                        <Typography variant="body2">{el.description}</Typography>
                                        <CardActions sx={{ padding: "0" }}>
                                            <Button size="small" sx={{ paddingLeft: "0" }} onClick={(() => navigate(`/items/${el.idcollection}`))}><FormattedMessage id="collection-all.card" /></Button>
                                        </CardActions>
                                    </CardContent>
                                        <CardActions sx={{ display: "flex", justifyContent: "flex-end", alignSelf: "flex-start" }}>
                                            <IconButton color="error" size='small' sx={{ padding: 0 }} onClick={() => handleDetele(el.idcollection)}>
                                                <Clear />
                                            </IconButton>
                                        </CardActions>
                                </Card>
                            </Paper>
                        </Grid>
                    ))}
                    <Grid xs={4} md={4}>
                        <Paper elevation ="4" sx={{ height: "100%" }}>
                            <Card sx={{ height: "100%", width: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-around", padding: "20px 0" }}>
                                <Typography variant={variant}><FormattedMessage id="collection-user.add" /></Typography>
                                <Button size='small' onClick={handleOpen}>
                                    <Add sx={{ fontSize: 40 }} />
                                </Button>
                                <AddCollection user={user} open={open} handleClose={handleClose} setCounter={setCounter} />
                            </Card>
                        </Paper>
                    </Grid>
                </Grid>
            </StyledBox>
        )
    }
}

export default UserCollectionsComponent;
