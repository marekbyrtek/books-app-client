import React, { useState, useEffect, useContext } from 'react';
import { TextField, Autocomplete, styled } from '@mui/material';
import { ServerContext } from '../../context/ServerContext';
import axios from 'axios';

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
    console.log(newValue);
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
              label="Search"
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
