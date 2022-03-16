import React from 'react';
import { Button, Form, Input } from 'antd';
import { FilterFilled, DeleteOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { setNotificationData } from 'redux/reducer/toast/toastReducer';
import ApiService, { errorResponse } from 'config/API/ApiService';
import Wrapper from 'components/UI/Wrapper/Wrapper';
import FormItem from 'components/UI/FormItem/FormItem';
import { filmSearchReducer } from 'redux/reducer/film/filmSearchReducer';
import useApiCatcher from 'config/global/helperFunctions/useApiCatcher';

const FilmSearch = ({ setIsLoading, setQueryParam }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const apiCatcher = useApiCatcher();

  const filmSearchStore = useSelector((state) => state.filmSearchStore.value);

  const onFinish = (values) => {
    let isRequired = false;
    for (const key in values) {
      values[key];
      if (values[key] !== undefined && values[key] !== '') {
        isRequired = true;
        break;
      }
    }

    if (isRequired) {
      setIsLoading(true);

      ApiService.get(`SearchMovie/${process.env.REACT_APP_API_KEY}/${values.expression}`)
        .then((data) => {
          if (data?.errorMessage) {
            dispatch(setNotificationData({ message: data?.errorMessage, type: 'error', time: 5000 }));
          } else if (data?.results?.length) {
            dispatch(filmSearchReducer({ searchResult: data?.results, isSearch: true, payload: values }));
          } else {
            dispatch(filmSearchReducer({ searchResult: [], isSearch: true }));
            dispatch(setNotificationData({ message: 'یافت نشد', type: 'error', time: 5000 }));
          }

          setIsLoading(false);
        })
        .catch(() => {
          setIsLoading(false);
          apiCatcher(errorResponse);
        });
    } else {
      dispatch(setNotificationData({ message: 'یکی از فیلدها را پر کنید', type: 'error', time: 5000 }));
    }
  };

  const resetSearch = () => {
    dispatch(filmSearchReducer({ isSearch: false, payload: '', searchResult: [] }));
    window.history.replaceState(null, 'update', location.pathname);
    const newQueryParam = {
      pageNumber: 1,
      recordsPerPage: 10,
    };
    setQueryParam(newQueryParam);
    form.resetFields();
  };

  return (
    <Form form={form} onFinish={onFinish} className='mb-6'>
      <Wrapper>
        <FormItem label='عنوان فیلم' name='expression'>
          <Input />
        </FormItem>
      </Wrapper>

      <FormItem button>
        {filmSearchStore?.isSearch && (
          <Button onClick={resetSearch} htmlType='button' type='danger' className='text-white bg-red-500 border-red-500 hover:bg-white hover:border-red-500 hover:text-red-500'>
            <DeleteOutlined />
            پاک کردن
          </Button>
        )}

        <Button type='primary' htmlType='submit' className='mr-5'>
          <FilterFilled />
          اعمال فیلتر
        </Button>
      </FormItem>
    </Form>
  );
};

export default FilmSearch;
