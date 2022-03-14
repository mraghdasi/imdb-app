import Sidebar from 'components/Layout/Sidebar/Sidebar';
import React from 'react';
import { useState } from 'react';

const VerticalSidebar = () => {
  //states
  const [open, setOpen] = useState(false);

  return (
    <aside className='sticky top-0 z-40 flex-shrink-0 hidden h-screen sm:block'>
      <div className={`flex overflow-y-auto flex-col pb-2 pt-3 mt-2 bg-gray-700 rounded-md ${!open && 'pt-4'}`} style={{ height: 'calc(100% - 16px)' }}>
        <Sidebar open={open} setOpen={setOpen} />
      </div>
    </aside>
  );
};

export default VerticalSidebar;
