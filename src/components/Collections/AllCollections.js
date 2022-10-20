import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import { Box, Skeleton, Typography, useMediaQuery, useTheme, styled, Paper, Button, Card, CardContent, CardActions } from '@mui/material';
import Grid from "@mui/material/Unstable_Grid2";

const StyledBox = styled(Box)(({ theme }) => ({
    width: "90%",
    [theme.breakpoints.down("sm")]: {
        width: "100%"
    }
}))

const AllCollections = ({ collections }) => {
    const navigate = useNavigate();
    const { authState } = useContext(AuthContext);
    const theme = useTheme();
    const variant = useMediaQuery(theme.breakpoints.up("sm")) ? "h4" : "h5";

    if (collections === null) {
        return (
            <StyledBox>
                <Typography variant={variant} sx={{ marginBottom: "10px" }}>Collections</Typography>
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
                <Typography variant={variant} sx={{ marginBottom: "10px" }}>Collections</Typography>
                <Grid container spacing={{ xs: 2, sm: 3 }} columns={{ xs: 4, md: 8 }}>
                    {collections.map((el) => (
                        <Grid xs={4} md={4} key={el.idcollection}>
                            <Paper elevation="4">
                                <Card>
                                    <CardContent>
                                        <Typography variant={variant}>{el.name}</Typography>
                                        <Typography color="text.secondary">{el.topic}</Typography>
                                        <Typography variant="body2">{el.description}</Typography>
                                        <Typography variant="body2">{el.author}</Typography>
                                        <CardActions sx={{ padding: "0" }}>
                                            <Button size="small" sx={{ paddingLeft: "0" }} onClick={(() => navigate(`/items/${el.idcollection}`))}>See collection</Button>
                                        </CardActions>
                                    </CardContent>
                                </Card>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            </StyledBox>
        )
    }

}

export default AllCollections;
