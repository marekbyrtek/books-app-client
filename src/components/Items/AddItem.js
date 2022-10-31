import React, {useState, useRef, useContext } from 'react';
import { Modal, Box, Paper, Button, styled, useTheme, FormControl, Alert, TextField } from "@mui/material";
import axios from 'axios';
import { ServerContext } from '../../context/ServerContext';
import { FormattedMessage } from 'react-intl';

const ModalBox = styled(Box)(({ theme }) => ({
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "60%",
    [theme.breakpoints.down("md")]: {
        width: "75%"
    },
    [theme.breakpoints.down("sm")]: {
        width: "90%"
    }
}))

const StyledFormControl = styled(FormControl)({
    margin: "15px 0"
})

const AddItem = ({ open, handleClose, collection, setCounter }) => {
    const theme = useTheme();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const nameRef = useRef();
    const tag1Ref = useRef();
    const tag2Ref = useRef();
    const tag3Ref = useRef();
    const { serverURL } = useContext(ServerContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        const tagsArr = [tag1Ref.current.value];
        (tag2Ref.current.value !== "") && tagsArr.push(tag2Ref.current.value);
        (tag3Ref.current.value !== "") && tagsArr.push(tag3Ref.current.value);
        const data = {
            name: nameRef.current.value,
            tags: tagsArr,
            collection: collection
        }
        setLoading(true);
        axios.post(`${serverURL}/api/items/add`, data)
            .then((resp) => {
                setTimeout(() => {
                    handleClose();
                    setCounter((prev) => prev + 1);
                }, 2000)
            })
            .catch((err) => {
                setError(err.response.data.message);
                setLoading(false);
            })
    }

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
        >
            <ModalBox>
                <Paper sx={{ border: `2px solid ${theme.palette.text.secondary}`, padding: "30px" }}>
                    {error && <Alert severity="error">{error}</Alert>}
                    <form onSubmit={handleSubmit} className="sign-form">
                        <StyledFormControl fullWidth variant='standard'>
                            <TextField id='name' label={<FormattedMessage id="home-items.table1" />} variant="standard" required inputRef={nameRef} />
                        </StyledFormControl>
                        <StyledFormControl fullWidth variant='standard'>
                            <TextField id='tag1' label="tag" variant="standard" required inputRef={tag1Ref} />
                        </StyledFormControl>
                        <StyledFormControl fullWidth variant='standard'>
                            <TextField id='tag2' label="tag" variant="standard" inputRef={tag2Ref} />
                        </StyledFormControl>
                        <StyledFormControl fullWidth variant='standard'>
                            <TextField id='tag3' label="tag" variant="standard" inputRef={tag3Ref} />
                        </StyledFormControl>
                        <Button type='submit' variant='contained' disabled={loading} size="large" sx={{ marginTop: "15px", alignSelf: "flex-end" }}><FormattedMessage id="items.button" /></Button>
                    </form>
                </Paper>
            </ModalBox>
        </Modal>
    )
}

export default AddItem;
