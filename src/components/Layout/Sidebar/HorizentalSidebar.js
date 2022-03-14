import Sidebar from 'components/Layout/Sidebar/Sidebar';
import React, { useState } from 'react';
import { MenuOutlined, CaretDownFilled } from '@ant-design/icons';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

const HorizentalSidebar = () => {
  //states
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  //functions
  const toggleOpen = () => setOpen((prevState) => !prevState);

  //effects
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <aside
      className={`flex overflow-hidden mb-2 transition-all duration-300 sm:hidden w-11/12 flex-col pb-2 pt-3 mt-2 mx-auto bg-gray-700 rounded-md ${
        open ? 'max-h-[1000px]' : 'max-h-[45px]'
      }`}>
      <div className='flex items-center justify-between px-2 mx-2 mb-4 text-white transition-all duration-300 rounded-md cursor-pointer hover:bg-gray-500' onClick={toggleOpen}>
        <div className='flex items-center gap-x-4'>
          <MenuOutlined />
          گزینه ها
        </div>
        <CaretDownFilled className='mr-auto transition-all' style={{ transform: open ? 'scaleY(-1)' : '' }} />
      </div>
      <Sidebar open={true} horizental />
    </aside>
  );
};

export default HorizentalSidebar;
