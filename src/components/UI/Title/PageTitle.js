import React from 'react';

const PageTitle = ({ title }) => {
  return (
    <div className='flex flex-col items-start pb-4 mb-4 border-b border-gray-400 gap-y-4 md:flex-row md:justify-between'>
      <div className='md:ml-16'>
        <p className='my-0 text-lg font-bold text-t-main-color'>{title}</p>
      </div>
    </div>
  );
};

export default PageTitle;
