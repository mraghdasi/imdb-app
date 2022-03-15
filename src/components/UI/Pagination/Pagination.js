import React from 'react';
import { Pagination } from 'antd';

const MyPagination = ({ responsive, total, current, onPaginationHandler, pageSize }) => {
  const onChangeHandler = (page, pageSize) => {
    onPaginationHandler(page, pageSize);
  };
  return (
    <Pagination
    className='text-left'
      showLessItems={true}
      pageSizeOptions={[10, 20, 30, 50]}
      pageSize={pageSize}
      responsive={responsive}
      defaultCurrent={1}
      current={current}
      onChange={onChangeHandler}
      total={total}
    />
  );
};

export default MyPagination;
