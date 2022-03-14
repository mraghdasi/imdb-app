import React, { useEffect } from 'react';
import Card from 'components/UI/Card/Card';
import PageTitle from 'components/UI/Title/PageTitle';
import ApiService from 'config/API/ApiService';

const FilmList = () => {
  console.log(process.env);

  useEffect(() => {
    ApiService.get(`Top250Movies/${process.env.REACT_APP_API_KEY}`).then((data) => {
      console.log(data);
    });
  });
  return (
    <Card>
      <PageTitle title='لیست جدیدترین فیلم ها' />
    </Card>
  );
};

export default FilmList;
