import React, { useState } from 'react';
import PropTypes from 'prop-types';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import { useAsyncDebounce } from 'react-table';

function GlobalFilter({ filter, setFilter }) {
  const [value, setValue] = useState(filter);

  const onChange = useAsyncDebounce((val) => {
    setFilter(val || undefined);
  }, 1000);
  return (
    <div>
      <FormControl fullWidth margin="normal">
        <TextField
          color="secondary"
          value={value || ''}
          onChange={(e) => {
            setValue(e.target.value);
            onChange(e.target.value);
          }}
          label="Filter All"
          variant="outlined"
        />
      </FormControl>
    </div>
  );
}

GlobalFilter.propTypes = {
  filter: PropTypes.string,
  setFilter: PropTypes.func,
};

export default GlobalFilter;
