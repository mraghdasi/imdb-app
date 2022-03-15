import React from 'react';

const Wrapper = ({ twoColumn, singleColumn, threeColumn, children, className }) => {
  return (
    <div className={`grid ${twoColumn ? 'grid-cols-2' : 'grid-cols-1'} gap-x-4 ${!singleColumn && 'lg:grid-cols-2'} ${threeColumn && 'xl:grid-cols-3'} ${className}`}>
      {children}
    </div>
  );
};

export default Wrapper;
