import React, { useState, useEffect, useContext } from 'react';
import { TextField, Autocomplete, styled } from '@mui/material';
import { ServerContext } from '../../context/ServerContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

const StyledSearchField = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  padding: "5px",
  margin: "5px 0",
  width: "40%",
  borderRadius: theme.shape.borderRadius,
  [theme.breakpoints.down("sm")]: {
    width: "60%"
}
}));

const SearchField = () => {
  const [searchOptions, setSearchOptions] = useState([]);
  const { serverURL } = useContext(ServerContext);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${serverURL}/api/search`)
      .then((res) => {
        setSearchOptions(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
  },[])

  const handleSearch = (e, newValue) => {
    e.preventDefault();
    navigate(`/search/${newValue}`);
  }

  return (
    <StyledSearchField>
      <Autocomplete
          freeSolo
          id="search-collection"
          disableClearable
          options={searchOptions}
          renderInput={(params) => (
            <TextField
              {...params}
              label={<FormattedMessage id="navbar.search-field" />}
              InputProps={{
                ...params.InputProps,
                type: 'search',
              }}
              size="small"
            />
            )}
          value=""
          onChange={handleSearch}
        />
    </StyledSearchField>
  )
}

export default SearchField;
