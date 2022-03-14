import 'assets/css/default/global.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import fa from 'antd/es/locale/fa_IR';
import { ConfigProvider } from 'antd';
import { Provider } from 'react-redux';
import App from './components/App';
import { store } from './redux/store';

ReactDOM.render(
  <ConfigProvider locale={fa} direction='rtl'>
    <Provider store={store}>
      <Router>
        <App className='rtl-grid' />
      </Router>
    </Provider>
  </ConfigProvider>,
  document.getElementById('root')
);
