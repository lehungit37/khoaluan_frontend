import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';

function ColumnFilter({ column }) {
  const { filterValue, setFilter } = column;
  return (
    <FormControl sx={{ margin: 0 }} fullWidth margin="normal">
      <TextField
        value={filterValue || ''}
        onChange={(e) => setFilter(e.target.value)}
        variant="standard"
      />
    </FormControl>
  );
}

ColumnFilter.propTypes = {
  column: PropTypes.object,
};

export default ColumnFilter;
