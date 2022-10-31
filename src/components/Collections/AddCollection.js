import React, { useState, useRef, useContext } from 'react';
import { Modal, Box, Paper, Button, styled, useTheme, FormControl, Alert, TextField, InputLabel, MenuItem, Select } from '@mui/material';
import axios from 'axios';
import { ServerContext } from '../../context/ServerContext';
import LanguageContext from "../../context/LanguageContext";
import { FormattedMessage } from 'react-intl';
import { width } from '@mui/system';

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

const StyledFormSelect = styled(FormControl)(({ theme }) => ({
    margin: "15px 0 0",
    width: "50%",
    [theme.breakpoints.down("sm")]: {
        width: "60%"
    }
}))

const AddCollection = ({ user, open, handleClose, setCounter }) => {
    const theme = useTheme();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [topic, setTopic] = useState("");
    const nameRef = useRef();
    const descriptionRef = useRef();
    const { serverURL } = useContext(ServerContext);
    const { locale } = useContext(LanguageContext);

    const handleChange = (e) => {
        setTopic(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            name: nameRef.current.value,
            description: descriptionRef.current.value,
            topic: topic,
            userid: user
        }
        setLoading(true);
        axios.post(`${serverURL}/api/collection/add`, data)
            .then((resp) => {
                setTimeout(() => {
                    handleClose();
                    setCounter((prev) => prev + 1);
                }, 2000)
            })
            .catch((err) => {
                setError(err.response.data.message);
            })
        setLoading(false);
    }

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
        >
            <ModalBox>
                <Paper sx={{ border: `2px solid ${theme.palette.text.secondary}`, padding: "20px" }}>
                    {error && <Alert severity="error">{error}</Alert>}
                        <form onSubmit={handleSubmit} className="sign-form">
                            <StyledFormControl fullWidth variant='standard'>
                                <TextField id='name' label={<FormattedMessage id="collection-add.label1" />} variant="standard" required inputRef={nameRef} />
                            </StyledFormControl>
                            <StyledFormControl fullWidth variant='standard'>
                                <TextField id='description' label={<FormattedMessage id="collection-add.label2" />} variant='standard' multiline required inputRef={descriptionRef} />
                            </StyledFormControl>
                            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", width: "100%" }}>
                                <StyledFormSelect>
                                    <InputLabel id="topic-select-label"><FormattedMessage id="collection-add.input1" /></InputLabel>
                                    <Select
                                        labelId="topic-select-label"
                                        id="topic-select"
                                        value={topic}
                                        onChange={handleChange}
                                        label="Topic"
                                        required
                                    >
                                        <MenuItem value={(locale === "pl") ? "Książki" : "Books"}><FormattedMessage id="collection-add.input2" /></MenuItem>
                                        <MenuItem value={(locale === "pl") ? "Alkohole" : "Alkohol"}><FormattedMessage id="collection-add.input3" /></MenuItem>
                                        <MenuItem value={(locale === "pl") ? "Znaczki pocztowe" : "Postcards"}><FormattedMessage id="collection-add.input4" /></MenuItem>
                                        <MenuItem value={(locale === "pl") ? "Pamiątki" : "Souvenirs"}><FormattedMessage id="collection-add.input5" /></MenuItem>
                                        <MenuItem value={(locale === "pl") ? "Inne" : "Other"}><FormattedMessage id="collection-add.input6" /></MenuItem>
                                    </Select>
                                </StyledFormSelect>
                                <Button type='submit' variant="contained" disabled={loading} size="large"><FormattedMessage id="collection-add.button" /></Button>
                            </Box>
                        </form>
                </Paper>
            </ModalBox>
        </Modal>
    )
}

export default AddCollection;
