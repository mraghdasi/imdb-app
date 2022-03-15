import React, { useEffect, useState } from 'react';
import Card from 'components/UI/Card/Card';
import PageTitle from 'components/UI/Title/PageTitle';
import Back from 'components/UI/Back/Back';
import ApiService, { errorResponse } from 'config/API/ApiService';
import { useLocation } from 'react-router';
import Loading from 'components/UI/Loading/Loading';
import useApiCatcher from 'config/global/helperFunctions/useApiCatcher';
import { useDispatch } from 'react-redux';
import { setNotificationData } from 'redux/reducer/toast/toastReducer';
import ShowInfo from 'components/UI/ShowInfo/ShowInfo';
import Wrapper from 'components/UI/Wrapper/Wrapper';
import { Image } from 'antd';

const FilmDetail = () => {
  const location = useLocation();
  const filmId = location.pathname.split('/');
  const [filmDetail, setFilmDetail] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const apiCatcher = useApiCatcher();
  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);
    ApiService.get(`Title/${process.env.REACT_APP_API_KEY}/${filmId?.[filmId.length - 1]}`)
      .then((data) => {
        if (data?.errorMessage) {
          dispatch(setNotificationData({ message: data?.errorMessage, type: 'error', time: 5000 }));
        } else if (data?.id) {
          setFilmDetail(data);
        } else {
          setFilmDetail();
        }
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
        apiCatcher(errorResponse);
      });
  }, []);

  return (
    <>
      <Back to='/films' />
      <Card>
        <PageTitle title={`مشخصات فیلم " ${filmDetail?.fullTitle} "`} />

        <Loading spinning={isLoading}>
          <Image height={250} src={filmDetail?.image} />
          <Wrapper className='mt-5'>
            <ShowInfo right='عنوان' left={filmDetail?.fullTitle} />
            <ShowInfo right='امتیاز' left={filmDetail?.imDbRating} />
            <ShowInfo right='مدت زمان' left={filmDetail?.runtimeStr} />
            <ShowInfo right='سال انتشار' left={filmDetail?.releaseDate} />
            <ShowInfo right='نویسندگان' list={filmDetail?.writerList} />
            <ShowInfo right='بازیگران' list={filmDetail?.starList} />
            <ShowInfo right='شرکت سازنده' left={filmDetail?.companies} />
            <ShowInfo right='مجموع امتیازات' left={filmDetail?.imDbRatingVotes} />
          </Wrapper>
        </Loading>
      </Card>
    </>
  );
};

export default FilmDetail;
