import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { ServerContext } from '../../context/ServerContext';
import { Box, Skeleton, Typography, useMediaQuery, useTheme, styled } from '@mui/material';
import axios from 'axios';
import SearchTable from './SearchTable';

const StyledBox = styled(Box)(({ theme }) => ({
    width: "90%",
    marginBottom: "50px",
    [theme.breakpoints.down("sm")]: {
        width: "100%"
    }
}))

function createData(name, collection, author, idcollection) {
    return { name, collection, author, idcollection };
  }

const Search = () => {
    const { tag } = useParams();
    const [searchResults, setSearchResults] = useState(null);
    const { serverURL } = useContext(ServerContext);
    const theme = useTheme();
    const variant = useMediaQuery(theme.breakpoints.up("sm")) ? "h5" : "h6";
    
    useEffect(() => {
        axios.get(`${serverURL}/api/search/${tag}`)
            .then((res) => {
                setSearchResults(res.data);
            })
            .catch((err) => {
                console.log(err);
            })
    },[])

    if (searchResults === null) {
        return (
            <Box
                flex={3}
                p={2}
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center"
                }}
            >
                <StyledBox>
                    <Typography variant={variant}>
                        {tag}:
                        <Skeleton variant="rounded" sx={{ marginBottom: "10px" }}/>
                        <Skeleton variant="rounded" sx={{ marginBottom: "10px" }}/>
                    </Typography>
                </StyledBox>
            </Box>
        )
    } else {
        const rows = searchResults.map((el) => createData(el.name, el.collection, el.author, el.idcollection));

        return (
            <Box
                flex={3}
                p={2}
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center"
                }}
            >
                <StyledBox>
                    <SearchTable rows={rows} variant={variant} tag={tag} />
                </StyledBox>
            </Box>
        )
    }
}

export default Search;
