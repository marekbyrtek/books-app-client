import React, { useState, useRef, useContext } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button, Alert } from '@mui/material';
import { ServerContext } from '../../context/ServerContext';
import AuthContext from '../../context/AuthContext';
import axios from 'axios';

const CommentsAdd = ({ open, handleClose, collection, fetchComments }) => {
    const commentRef = useRef();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const { serverURL } = useContext(ServerContext);
    const { authState } = useContext(AuthContext);

    const handleSubmit = () => {
        const data = {
            collection: collection,
            user: authState.id,
            comment: commentRef.current.value
        }
        setLoading(true);
        axios.post(`${serverURL}/api/comments/add`, data)
            .then((resp) => {
                fetchComments();
                handleClose();
            })
            .catch((err) => {
                setError(err);
            })
    }

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
            {error && <Alert severity="error">{error}</Alert>}
            <DialogTitle>Add comment</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    id='comment'
                    label="comment"
                    multiline
                    fullWidth
                    variant='standard'
                    inputRef={commentRef}
                />
            </DialogContent>
            <DialogActions>
                <Button disabled={loading} onClick={handleClose}>Cancel</Button>
                <Button disabled={loading} onClick={handleSubmit}>Send</Button>
            </DialogActions>
        </Dialog>
    )
}

export default CommentsAdd;
