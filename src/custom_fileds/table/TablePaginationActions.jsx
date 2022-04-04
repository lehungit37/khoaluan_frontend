import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import * as React from 'react';
const TablePaginationActions = (props) => {
  const { page, handleChangePage, count, total, disabled } = props;
  return (
    <Stack
      sx={{ p: 2, pr: 10 }}
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
    >
      <Pagination
        showFirstButton
        showLastButton
        color="primary"
        count={count}
        page={page}
        onChange={handleChangePage}
        disabled={disabled}
      />
      <Typography variant="body1">
        {disabled ? 'Đang tải...' : `Tổng số: ${total}`}
      </Typography>
    </Stack>
  );
};

TablePaginationActions.propTypes = {
  count: PropTypes.number,
  onPageChange: PropTypes.func,
  page: PropTypes.number,
  total: PropTypes.number,
};

export default TablePaginationActions;
