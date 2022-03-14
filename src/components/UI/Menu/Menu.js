import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CaretDownFilled } from '@ant-design/icons';
import { useState } from 'react';
import { useEffect } from 'react';
import { Tooltip, Popover } from 'antd';

const Menu = ({ name, icon, to, subMenu, open }) => {
  //state
  const [isOpen, setIsOpen] = useState(false);

  //hooks
  const { pathname } = useLocation();

  //effects
  useEffect(() => {
    if (!subMenu) return;
    setIsOpen(isAnySubMenusSelected());
  }, [pathname]);

  //functions
  const getLinklength = (link) => {
    if (!link) return 0;
    return link.split('/').length - 1;
  };
  const getImportantPartOfPathname = (customLink) => {
    if (!to && !customLink) return;
    const result = pathname.split('/');
    result.shift();
    return result.slice(0, getLinklength(to || customLink)).join('');
  };
  const isAnySubMenusSelected = () => subMenu.some((item) => item.to.replaceAll('/', '') === getImportantPartOfPathname(item.to));
  const isSelected = (customLink) => {
    if (customLink) return customLink.replaceAll('/', '') === getImportantPartOfPathname(customLink);
    if (!to) return false;
    return to.replaceAll('/', '') === getImportantPartOfPathname();
  };

  const subMenuItems = () => {
    return subMenu.map((item, index) => {
      return (
        <div className='px-2 mb-2 transition-all duration-300 ease-out group' key={index}>
          <Link to={item.to}>
            <div
              className={`flex items-center px-3 py-1 transition-all ease-out duration-300  rounded-md hover:text-white ${
                isSelected(item.to) && 'bg-gray-500 text-white shadow-xl'
              }`}>
              {open && <div className='w-3' />}
              {open && item.name}
            </div>
          </Link>
        </div>
      );
    });
  };
  const getSubmenuHoverContent = () => (
    <div className='text-gray-300 bg-gray-800 '>
      {subMenu.map((item, index) => {
        return (
          <Link to={item.to} key={index}>
            <div key={index} className={`p-2 whitespace-nowrap rounded-md hover:text-white ${isSelected(item.to) && 'bg-gray-500 text-white'}`}>
              {item.name}
            </div>
          </Link>
        );
      })}
    </div>
  );

  if (to)
    return (
      <Tooltip placement='left' title={!open ? name : ''}>
        <div className='w-full px-2 mb-2 text-gray-400 transition-all duration-300 ease-out group'>
          <Link to={to}>
            <div
              className={`flex items-center px-3 py-1 transition-all ease-out duration-300   rounded-md group-hover:text-white ${
                isSelected() && 'bg-gray-500 text-white shadow-xl'
              }`}>
              {icon}
              {open && <div className='w-2' />}
              {open && name}
            </div>
          </Link>
        </div>
      </Tooltip>
    );

  if (subMenu)
    return (
      <Popover
        content={getSubmenuHoverContent()}
        placement='left'
        trigger={!open ? 'hover' : ''}
        color='rgb(31 41 55)'
        overlayStyle={{ border: '1px solid rgba(0,0,0,0)' }}
        overlayInnerStyle={{ border: '1px solid rgba(0,0,0,0)' }}>
        <div
          className={`px-2 relative flex-shrink-0  transition-all ease-out duration-300 cursor-pointer group text-gray-400 ${open && 'overflow-hidden mb-2'} ${
            isOpen && open ? 'bg-gray-600' : ''
          } `}
          style={{ maxHeight: isOpen && open ? `${subMenu.length * 40 + 40}px` : '28px' }}>
          <div
            className={`flex items-center mb-2  px-3 py-1 transition-all ease-out duration-300  rounded-md group-hover:text-white ${isOpen && ' text-white'} ${
              isAnySubMenusSelected() && (!isOpen || !open) && 'bg-gray-500 text-white'
            }`}
            onClick={() => setIsOpen(!isOpen)}>
            {icon}
            {open && <div className='w-2' />}
            {open && name}
            {subMenu && open && <CaretDownFilled className='mr-auto transition-all' style={{ transform: isOpen ? 'scaleY(-1)' : '' }} />}
          </div>
          {open && subMenuItems()}
        </div>
      </Popover>
    );
};

export default Menu;
