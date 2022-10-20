import React from 'react';
import { Box, Skeleton, Typography, useMediaQuery, useTheme } from '@mui/material';

const CollectionsHome = ({ biggestCollections }) => {
    const theme = useTheme();
    const variant = useMediaQuery(theme.breakpoints.up("sm")) ? "h4" : "h5";

    if (biggestCollections === null) {
        return (
            <Box sx={{width: "80%"}}>
                <Typography variant={variant}>
                    Biggest collections
                    <Skeleton variant="rounded" sx={{ marginBottom: "10px" }}/>
                    <Skeleton variant="rounded" sx={{ marginBottom: "10px" }}/>
                    <Skeleton variant="rounded" sx={{ marginBottom: "10px" }}/>
                    <Skeleton variant="rounded" sx={{ marginBottom: "10px" }}/>
                    <Skeleton variant="rounded" sx={{ marginBottom: "10px" }}/>
                </Typography>
            </Box>
        )
    } else {
        return (
            <div>CollectionsHome</div>
        )
    }
}

export default CollectionsHome;
