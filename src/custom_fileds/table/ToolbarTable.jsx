import AddIcon from '@mui/icons-material/Add';
import { Button } from '@mui/material';
import React from 'react';
function ToolbarTable(props) {
  const { handleOpen } = props;

  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
        }}
      >
        <div>
          <Button
            variant="outlined"
            onClick={handleOpen}
            startIcon={<AddIcon />}
          >
            Thêm mới
          </Button>
        </div>
      </div>
    </>
  );
}

ToolbarTable.propTypes = {};

export default ToolbarTable;
