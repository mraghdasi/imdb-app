import { Card, Image } from 'antd';
import React from 'react';
import { HeartOutlined, HeartFilled } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import MyTooltip from 'components/UI/Tooltip/Tooltip';

const FilmCard = ({ id, src, title, year, rate, addToWatchList, deleteFromWatchList, fullInfo, isWatchList }) => {
  return (
    <Card
      className='mb-10'
      key={id}
      cover={<Image alt={title} src={src} />}
      actions={[
        ...(year
          ? [
              <MyTooltip key='year' title='سال تولید'>
                {year}
              </MyTooltip>,
            ]
          : []),
        ...(rate
          ? [
              <MyTooltip key='rate' title='امتیاز'>
                {rate}
              </MyTooltip>,
            ]
          : []),
        ...(isWatchList
          ? [
              <MyTooltip key='watchListFilled' title='حذف از علاقه مندی'>
                <HeartFilled onClick={() => deleteFromWatchList(fullInfo)} style={{ color: '#1890ff' }} />
              </MyTooltip>,
            ]
          : [
              <MyTooltip key='watchListFilled' title='افزودن به علاقه مندی'>
                <HeartOutlined key='watchList' onClick={() => addToWatchList(fullInfo)} />
              </MyTooltip>,
            ]),
      ]}>
      <Link to={`/films/detail/${id}`}>{title}</Link>
    </Card>
  );
};

export default FilmCard;
