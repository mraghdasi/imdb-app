import React from 'react';
import { LogoutOutlined, UserOutlined, InfoCircleOutlined } from '@ant-design/icons';
// import { Menu } from 'antd';
import { useDispatch } from 'react-redux';
import { logout } from 'redux/reducer/Login/loginReducer';
import { setNotificationData } from 'redux/reducer/Toast/toastReducer';
import { useHistory, useLocation } from 'react-router-dom';
import { removeUserBranches } from 'redux/reducer/UserBranches/UserBranchesReducer';
import igtLogo from 'assets/images/tipax-logo-name.png';
import { removeFinancial } from 'redux/reducer/Financial/FinancialReducer';
import { removeOrderList } from 'redux/reducer/ListOrders/listOrdersReducer';
import useHasAccess from 'global/helperFunctions/useHasAccess';

const TcHeader = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { pathname } = useLocation();
  const { hasAccessTo } = useHasAccess();

  const onClick = (key) => {
    if (key === '3') {
      dispatch(setNotificationData({ message: 'با موفقیت خارج شدید', type: 'success', time: 5000 }));
      dispatch(logout());
      dispatch(removeUserBranches());
      dispatch(removeFinancial());
      dispatch(removeOrderList());
      history.push('/login');
    } else if (key === '1') {
      history.push('/settings');
    } else if (key === '2') {
      history.push('/notifications');
    } else if (key === '0') {
      history.push('/profile');
    } else if (key === '4') {
      history.push('/encyclopedia');
    }
  };
  // const menu = (
  //   <Menu onClick={onClick}>
  //     <Menu.Item key='0'>
  //       {' '}
  //       <UserOutlined />
  //       پروفایل
  //     </Menu.Item>
  //     {/* <Menu.Item key='1'>
  //       {' '}
  //       <SettingOutlined />
  //       تنظیمات
  //     </Menu.Item>
  //     <Menu.Item key='2'>
  //       {' '}
  //       <SettingOutlined />
  //       اعلانات
  //     </Menu.Item> */}
  //     <Menu.Item key='3'>
  //       {' '}
  //       <LogoutOutlined />
  //       خروج
  //     </Menu.Item>
  //   </Menu>
  // );
  return (
    <div className='flex flex-col items-center justify-between w-11/12 px-6 py-2 mx-auto mt-2 mb-4 bg-white border rounded-md shadow-md sm:flex-row '>
      <div className=' w-fit'>
        <img src={igtLogo} alt='tipax logo border' className='object-contain object-right h-8 ' />
      </div>

      <div className='flex text-left cursor-pointer'>
        {hasAccessTo(false) && (
          <div className={`text-center px-3 rounded-md ${pathname === '/encyclopedia' && 'bg-gray-200 '}`} onClick={() => onClick('4')}>
            <InfoCircleOutlined className='ml-2' />
            دانش نامه
          </div>
        )}
        <div className={`text-center px-3 rounded-md ${pathname === '/profile' && 'bg-gray-200 '}`} onClick={() => onClick('0')}>
          <UserOutlined className='ml-2' />
          پروفایل
        </div>
        <div className='mr-4 text-center cursor-pointer' onClick={() => onClick('3')}>
          <LogoutOutlined className='ml-2' />
          خروج
        </div>
        {/* <Dropdown overlay={menu}>
          <a className='ant-dropdown-link' onClick={(e) => e.preventDefault()}>
            <span className='avatar-item'>
              <Badge count={1}>
              <Avatar icon={<UserOutlined />} />
              </Badge>
            </span>
          </a>
        </Dropdown> */}
      </div>
    </div>
  );
};

export default TcHeader;
