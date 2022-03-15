import Content from 'components/Layout/Content/Content';
import HorizentalSidebar from 'components/Layout/Sidebar/HorizentalSidebar';
import VerticalSidebar from 'components/Layout/Sidebar/VerticalSidebar';
import React from 'react';
const Layout = ({ children }) => {
  return (
    <div className='flex min-h-screen bg-gray-100'>
      <VerticalSidebar />
      <div className='flex flex-col flex-grow-0 flex-shrink w-full mx-auto' style={{ maxWidth: '1400px' }}>
        <HorizentalSidebar />
        <Content>{children}</Content>
      </div>
    </div>
  );
};

export default Layout;
