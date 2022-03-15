import React from 'react';
import { Tooltip } from 'antd';

const MyTooltip = ({ title, children }) => {
  return (
    <Tooltip placement='top' title={title}>
      {children}
    </Tooltip>
  );
};

export default MyTooltip;
