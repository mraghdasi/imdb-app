import React from 'react';
import { DoubleRightOutlined, VideoCameraOutlined, HeartOutlined } from '@ant-design/icons';
import TcMenu from 'components/UI/Menu/TcMenu';
import { useEffect } from 'react';
import useScreenWidth from 'config/global/helperFunctions/useScreenWidth';

const TcSidebar = ({ open, setOpen, horizental }) => {
  //hooks
  const screenWidth = useScreenWidth();

  //effects
  useEffect(() => {
    if (!horizental) {
      screenWidth < 768 && open && setOpen(false);
      screenWidth > 768 && !open && setOpen(true);
    }
  }, [screenWidth]);

  return (
    <>
      <TcMenu name='جدیدترین فیلم ها' icon={<VideoCameraOutlined />} to='/' open={open} role={true} />

      <TcMenu name='لیست علاقه مندی' icon={<HeartOutlined />} to='/person' open={open} />

      {!horizental && (
        <div className='px-2 mt-auto cursor-pointer' onClick={() => setOpen(!open)}>
          <div className='flex items-center justify-center px-2 py-1 text-center text-white bg-gray-500 rounded-md'>
            <DoubleRightOutlined className='duration-300 trnasition-all' style={{ transform: !open ? 'scaleX(-1)' : '' }} />
          </div>
        </div>
      )}
    </>
  );
};

export default TcSidebar;