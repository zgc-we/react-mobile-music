import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './interceptors';
ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker(); // 离线缓存使用