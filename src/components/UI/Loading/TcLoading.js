import React from 'react';
import { Spin } from 'antd';

const TcLoading = ({ children, spinning, className, ...props }) => {
  return (
    <Spin className={className} spinning={spinning} {...props}>
      {children}
    </Spin>
  );
};

export default TcLoading;
