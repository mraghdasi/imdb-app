import React from 'react';
import { RightOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const Back = ({ to, onClick }) => {
  const elements = () => (
    <div className='flex items-center mb-2 cursor-pointer'>
      <RightOutlined style={{ color: 'black' }} />
      <p className='relative mb-0 mr-2 '>بازگشت</p>
    </div>
  );

  return (
    <div className='flex items-center w-full mt-3 md:container md:mx-auto'>
      {to ? (
        <Link className='flex' to={to}>
          {elements()}
        </Link>
      ) : (
        <div onClick={onClick} className='flex'>
          {elements()}
        </div>
      )}
    </div>
  );
};

export default Back;
