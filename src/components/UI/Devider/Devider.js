import React from 'react';
import { Divider } from 'antd';

const Devider = ({ className, orientation = 'right', children, ...props }) => {
  return (
    <Divider
      className={` mt-8 mb-6 col-span-full ${className}`}
      style={{ borderTopColor: 'rgba(0, 0, 0, 0.15)', fontSize: '0.75rem', color: 'rgb(107, 114, 128)' }}
      orientation={orientation}
      {...props}>
      {children}
    </Divider>
  );
};

export default Devider;
