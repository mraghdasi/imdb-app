import React from 'react';

const ShowInfo = ({ right, left = '', list, className, full, nowrap = true, notNormal = true, marginLeft }) => {
  return (
    <div className={`${className} items-center mb-2 md:flex  ${full && 'col-span-full w-full'}`}>
      <p className={`${notNormal ? 'ml-2 text-gray-500' : `${marginLeft}`} ${nowrap && 'whitespace-nowrap'}`}>{right + ' : '}</p>
      <p className=''>{left}</p>
      {list?.length && list?.map((item, index) => <p key={index}>{item?.name || 'ثبت نشده'} - </p>)}
    </div>
  );
};

export default ShowInfo;
