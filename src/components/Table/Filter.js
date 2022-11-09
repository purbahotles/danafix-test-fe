import React from 'react';
import Popover from '@material-ui/core/Popover';

export default function Filter({ columns  }) {
  const [anchorEl, setAnchorEl] = React.useState();

  const handleClose = () => {
    setAnchorEl();
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div>
      <Popover
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        id={id}
        onClose={handleClose}
        open={open}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
      </Popover>
    </div>
  );
}
