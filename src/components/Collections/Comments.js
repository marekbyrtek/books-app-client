import React, { useState, useContext } from 'react';
import { CardContent, Collapse, Typography, styled, IconButton, CardActions, Skeleton, List, ListItem, ListItemText, Divider, Button } from '@mui/material';
import { FavoriteBorder, Favorite, Comment } from "@mui/icons-material";
import { red } from '@mui/material/colors';
import { ServerContext } from '../../context/ServerContext';
import axios from 'axios';
import CommentsAdd from './CommentsAdd';
import { FormattedMessage } from 'react-intl';

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />
})(({ expand }) => ({
    color: !expand ? "primary" : "warning"
}))

const Comments = ({ collection, authState, listOfLikes, setCounter }) => {
    const [expanded, setExpanded] = useState(false);
    const [open, setOpen] = useState(false);
    const [listOfComments, setListOfComents] = useState(null);
    const { serverURL } = useContext(ServerContext);

    const handleOpen = () => {
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
    };

    const fetchComments = () => {
        axios.get(`${serverURL}/api/comments/${collection}`)
            .then((res) => {
                setListOfComents(res.data);
            })
            .catch((err) => {
                console.log(err);
            })
    }
    
    const handleExpand = () => {
        setExpanded(!expanded);
        fetchComments();
    }

    const handleAddLike = () => {
        const data = {
            user: authState.id,
            collection: collection
        }
        axios.post(`${serverURL}/api/likes/add`, data)
            .then((resp) => setCounter((prev) => prev + 1))
            .catch((err) => console.log(err))
    }

    const handleDeleteLike = () => {
        const data = {
            user: authState.id,
            collection: collection
        }
        axios.post(`${serverURL}/api/likes/delete`, data)
            .then((resp) => setCounter((prev) => prev + 1))
            .catch((err) => console.log(err))
    }
    const handleLike = () => {
        listOfLikes.includes(collection) ? handleDeleteLike() : handleAddLike()
    }

    return (
        <>
            <CardActions sx={{ paddingTop: "0", display: "flex", justifyContent: "space-between" }}>
                {authState.status && (
                    <IconButton onClick={handleLike}>
                        {listOfLikes.includes(collection) ? (<Favorite htmlColor={red[500]} />) : (<FavoriteBorder />)}
                    </IconButton>
                )}
                <ExpandMore
                    expand={expanded}
                    onClick={handleExpand}
                    aria-expanded={expanded}
                    aria-label="show comments"
                >
                    <Comment />
                </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    {(listOfComments === null) ? (
                        <Typography variant="h5">
                            <Skeleton variant="rounded" sx={{ marginBottom: "10px" }} />
                            <Skeleton variant="rounded" />
                        </Typography>
                    ) : (
                        <>
                            <List sx={{ width: "100%" }}>
                                {listOfComments.map((el) => {
                                    return (
                                        <>
                                            <ListItem key={el.idcomments} sx={{ padding: 0 }}>
                                                <ListItemText
                                                    primary={el.name}
                                                    secondary={el.comment}
                                                />
                                            </ListItem>
                                            <Divider  component="li" />
                                        </>
                                    )
                                })}
                            </List>
                            {authState.status && <Button onClick={handleOpen}><FormattedMessage id="collection-comments" /></Button>}
                            <CommentsAdd open={open} handleClose={handleClose} collection={collection} fetchComments={fetchComments} />
                        </>
                    )}
                </CardContent>
            </Collapse>
        </>
    )
}

export default Comments;
