import React from 'react';
import packageJson from '../../../../package.json';

const TcFooter = () => {
  const route = window.location.pathname;
  return (
    <div className={`mt-auto ${route.includes('login') ? 'w-full' : 'w-11/12'} mx-auto justify-between block sm:flex bg-white rounded-md p-2 px-4 border shadow-md`}>
      <p className='mb-0'>دپارتمان IT تیپاکس - 2021</p>
      <p className='mb-0'>پنل مدیریتی تیپاکس یکپارچه - نسخه: {packageJson.version}</p>
    </div>
  );
};

export default TcFooter;
