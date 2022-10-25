import React, { useState, useEffect, useContext } from 'react';
import {TagCloud as TagCloudComponent} from "react-tagcloud";
import { Box, styled, Typography, Skeleton, useTheme, useMediaQuery } from '@mui/material';
import { ServerContext } from '../../context/ServerContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const StyledBox = styled(Box)(({ theme }) => ({
    width: "90%",
    marginTop: "50px",
    [theme.breakpoints.down("sm")]: {
        width: "100%"
    }
}))

const TagCloud = () => {
    const [tags, setTags] = useState(null);
    const { serverURL } = useContext(ServerContext);
    const theme = useTheme();
    const variant = useMediaQuery(theme.breakpoints.up("sm")) ? "h3" : "h4";
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`${serverURL}/api/search`)
            .then((res) => {
                setTags(res.data);
            })
            .catch((err) => {
                console.log(err);
            })
    },[])

    if (tags === null) {
        return (
            <StyledBox>
                <Typography variant={variant}>
                    <Skeleton variant="rounded" />
                </Typography>
            </StyledBox>
        )
    } else {
        const tagsObject = [];
        tags.map((el) => {
            tagsObject.push({value: el, count: Math.floor(Math.random() * 100) + 1})
        })
        return (
            <StyledBox>
                <TagCloudComponent style={{
                    cursor: "pointer",
                    textAlign: "center"
                    }}
                    minSize={30}
                    maxSize={60}
                    tags={tagsObject}
                    onClick={(tag) => navigate(`/search/${tag.value}`)} />
            </StyledBox>
        )
    }
}

export default TagCloud;
