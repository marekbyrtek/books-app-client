import React from 'react'
import { TextField, Autocomplete, styled } from '@mui/material'

const SearchField = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  padding: "5px",
  margin: "5px 0",
  width: "40%",
  borderRadius: theme.shape.borderRadius,
  [theme.breakpoints.down("sm")]: {
    width: "60%"
}
}));

const Search = () => {

  const handleSearch = (e, newValue) => {
    e.preventDefault();
    console.log(newValue);
  }

  return (
    <SearchField>
      <Autocomplete
          freeSolo
          id="search-collection"
          disableClearable
          options={["jeden", "dwa", "trzy"]}
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
    </SearchField>
  )
}

export default Search;
