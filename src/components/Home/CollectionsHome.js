import React from 'react';
import { Box, Skeleton, Typography, useMediaQuery, useTheme, styled, Paper, Button, Card, CardContent, CardActions } from '@mui/material';
import Grid from "@mui/material/Unstable_Grid2";
import { ArrowForward } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const StyledBox = styled(Box)(({ theme }) => ({
    width: "90%",
    [theme.breakpoints.down("sm")]: {
        width: "100%"
    }
}))

const CollectionsHome = ({ biggestCollections }) => {
    const theme = useTheme();
    const variant = useMediaQuery(theme.breakpoints.up("sm")) ? "h5" : "h6";
    const navigate = useNavigate();

    if (biggestCollections === null) {
        return (
            <StyledBox>
                <Typography variant={variant}>
                    Biggest collections
                    <Skeleton variant="rounded" sx={{ marginBottom: "10px" }}/>
                    <Skeleton variant="rounded" sx={{ marginBottom: "10px" }}/>
                    <Skeleton variant="rounded" sx={{ marginBottom: "10px" }}/>
                    <Skeleton variant="rounded" sx={{ marginBottom: "10px" }}/>
                    <Skeleton variant="rounded" sx={{ marginBottom: "10px" }}/>
                </Typography>
            </StyledBox>
        )
    } else {
        return (
            <StyledBox>
                <Typography variant={variant} sx={{ marginBottom: "10px" }}>Biggest collections:</Typography>
                <Grid container spacing={{ xs: 2, sm: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                    {biggestCollections.map((el) => (
                        <Grid xs={2} sm={4} md={4} key={el.idcollection}>
                            <Paper elevation="4">
                                <Card>
                                    <CardContent>
                                        <Typography variant={variant}>{el.name}</Typography>
                                        <Typography color="text.secondary">{el.author}</Typography>
                                        <Typography variant="body2">{el.topic}</Typography>
                                        <CardActions sx={{ padding: "0" }}>
                                            <Button size="small" sx={{ paddingLeft: "0" }} onClick={(() => navigate(`/items/${el.idcollection}`))}>See collection</Button>
                                        </CardActions>
                                    </CardContent>
                                </Card>
                            </Paper>
                        </Grid>
                    ))}
                    <Grid xs={2} sm={4} md={4}>
                        <Paper elevation ="4" sx={{ height: "100%" }}>
                            <Card sx={{ height: "100%", width: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-around", padding: "20px 0" }}>
                                <Typography variant={variant}>See all</Typography>
                                <Button size='small' onClick={(() => navigate("/collections"))}>
                                    <ArrowForward sx={{ fontSize: 40 }} />
                                </Button>
                            </Card>
                        </Paper>
                    </Grid>
                </Grid>
            </StyledBox>
        )
    }
}
// name, topic, author
export default CollectionsHome;
