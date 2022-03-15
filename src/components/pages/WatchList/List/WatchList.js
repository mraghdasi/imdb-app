import React, { useState } from 'react';
import queryString from 'query-string';
import Card from 'components/UI/Card/Card';
import Wrapper from 'components/UI/Wrapper/Wrapper';
import FilmCard from 'components/pages/Films/components/FilmCard';
import Pagination from 'components/UI/Pagination/Pagination';
import PageTitle from 'components/UI/Title/PageTitle';
import { deleteFromArray } from 'config/global/default';
import { Alert } from 'antd';

const WatchList = () => {
  const watchLists = JSON.parse(window.localStorage.getItem('watchLists')) || [];
  const [queryParam, setQueryParam] = useState(queryString.parse(location.search));
  const [_isFilledIcon, setIsFilledIcon] = useState(false);

  const onPaginationHandler = (pageNumber, recordsPerPage = 10) => {
    const newQueryParam = {
      ...queryParam,
      pageNumber: pageNumber || 1,
      recordsPerPage: recordsPerPage || 10,
    };

    window.history.replaceState(null, 'update', `${location.pathname}?${queryString.stringify(newQueryParam)}`);
    setQueryParam(newQueryParam);
    window.scrollTo(0, 0);
  };
  const deleteFromWatchListHandler = (value) => {
    const updateWatchLists = deleteFromArray(watchLists, value);
    window.localStorage.setItem('watchLists', JSON.stringify(updateWatchLists));
    setIsFilledIcon((prevState) => !prevState);
  };

  return (
    <Card>
      <PageTitle title='لیست علاقه مندی ها' />

      {watchLists.length === 0 ? (
        <Alert className='lg:w-5/12 mx-auto sm:flex-row flex-col mb-8' showIcon description='فیلمی در لیست علاقه مندی ها وجود ندارد' type='error' />
      ) : (
        <Wrapper threeColumn>
          {watchLists
            .slice(
              +queryParam?.pageNumber === 1 ? 0 : (+queryParam?.pageNumber - 1) * +queryParam?.recordsPerPage || 0,
              +queryParam?.recordsPerPage === 1 ? 10 : +queryParam?.pageNumber * +queryParam?.recordsPerPage || 10
            )
            .map((film) => (
              <FilmCard
                id={film?.id}
                isWatchList={watchLists.some((item) => item.id === film?.id)}
                fullInfo={film}
                deleteFromWatchList={deleteFromWatchListHandler}
                key={film?.id}
                src={film?.image}
                title={film?.fullTitle || film?.title}
                year={film?.year || undefined}
                rate={film?.imDbRating || undefined}
              />
            ))}
        </Wrapper>
      )}

      <Pagination
        onPaginationHandler={onPaginationHandler}
        responsive={true}
        pageSize={+queryParam?.recordsPerPage || 10}
        current={+queryParam?.pageNumber || 1}
        total={watchLists.length}
      />
    </Card>
  );
};

export default WatchList;
