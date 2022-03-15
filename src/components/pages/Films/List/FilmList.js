import React, { useEffect, useState } from 'react';
import queryString from 'query-string';
import Card from 'components/UI/Card/Card';
import PageTitle from 'components/UI/Title/PageTitle';
import ApiService, { errorResponse } from 'config/API/ApiService';
import FilmCard from '../components/FilmCard';
import Wrapper from 'components/UI/Wrapper/Wrapper';
import useApiCatcher from 'config/global/helperFunctions/useApiCatcher';
import { setNotificationData } from 'redux/reducer/toast/toastReducer';
import { useDispatch, useSelector } from 'react-redux';
import Loading from 'components/UI/Loading/Loading';
import Pagination from 'components/UI/Pagination/Pagination';
import { useLocation } from 'react-router';
import FilmSearch from '../Search/FilmSearch';
import { filmSearchReducer } from 'redux/reducer/film/filmSearchReducer';
import Devider from 'components/UI/Devider/Devider';
import { addToArray, deleteFromArray } from 'config/global/default';

const FilmList = () => {
  const watchLists = JSON.parse(window.localStorage.getItem('watchLists')) || [];
  const [isLoading, setIsLoading] = useState(false);
  const [_isFilledIcon, setIsFilledIcon] = useState(false);
  const apiCatcher = useApiCatcher();
  const dispatch = useDispatch();
  const location = useLocation();

  const [queryParam, setQueryParam] = useState(queryString.parse(location.search));
  const filmSearchStore = useSelector((state) => state.filmSearchStore.value);

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

  useEffect(() => {
    setIsLoading(true);
    ApiService.get(`Top250Movies/${process.env.REACT_APP_API_KEY}`)
      .then((data) => {
        if (data?.errorMessage) {
          dispatch(setNotificationData({ message: data?.errorMessage, type: 'error', time: 5000 }));
        } else if (data?.items?.length) {
          dispatch(filmSearchReducer({ data: data?.items }));
        } else {
          dispatch(filmSearchReducer({ data: [] }));
        }
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
        apiCatcher(errorResponse);
      });
  }, []);

  const films = filmSearchStore.searchResult.length > 0 ? filmSearchStore.searchResult : filmSearchStore.data;

  const addWtachListHandler = (value) => {
    const updateWatchLists = addToArray(watchLists, value);
    window.localStorage.setItem('watchLists', JSON.stringify(updateWatchLists));
    setIsFilledIcon((prevState) => !prevState);
  };

  const deleteFromWatchListHandler = (value) => {
    const updateWatchLists = deleteFromArray(watchLists, value);
    window.localStorage.setItem('watchLists', JSON.stringify(updateWatchLists));
    setIsFilledIcon((prevState) => !prevState);
  };

  return (
    <Card>
      <PageTitle title='لیست جدیدترین فیلم ها' />

      <Devider>جستجو فیلم</Devider>
      <FilmSearch setIsLoading={setIsLoading} setQueryParam={setQueryParam} />

      <Loading spinning={isLoading}>
        <Devider>لیست فیلم ها</Devider>
        <Wrapper threeColumn>
          {films
            .slice(
              +queryParam?.pageNumber === 1 ? 0 : (+queryParam?.pageNumber - 1) * +queryParam?.recordsPerPage || 0,
              +queryParam?.recordsPerPage === 1 ? 10 : +queryParam?.pageNumber * +queryParam?.recordsPerPage || 10
            )
            .map((film) => (
              <FilmCard
                id={film?.id}
                isWatchList={watchLists.some((item) => item.id === film?.id)}
                fullInfo={film}
                addToWatchList={addWtachListHandler}
                deleteFromWatchList={deleteFromWatchListHandler}
                key={film?.id}
                src={film?.image}
                title={film?.fullTitle || film?.title}
                year={film?.year || undefined}
                rate={film?.imDbRating || undefined}
              />
            ))}
        </Wrapper>

        <Pagination
          onPaginationHandler={onPaginationHandler}
          responsive={true}
          pageSize={+queryParam?.recordsPerPage || 10}
          current={+queryParam?.pageNumber || 1}
          total={films.length}
        />
      </Loading>
    </Card>
  );
};

export default FilmList;
