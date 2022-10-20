import React from 'react';
import { Box, Skeleton, Typography, useMediaQuery, useTheme } from '@mui/material';

const ItemsHome = ({ lastItems }) => {
    const theme = useTheme();
    const variant = useMediaQuery(theme.breakpoints.up("sm")) ? "h5" : "h6";
    
    if (lastItems === null) {
        return(
            <Box sx={{width: "80%", marginBottom: "50px" }}>
                <Typography variant={variant}>
                    Last items
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
            <div>ItemsHome</div>
        )
    }
}

export default ItemsHome;
