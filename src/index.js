import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Login from './Login/login';
import 'bootstrap/dist/css/bootstrap.min.css';
import TokenPage from './Login/tokenPage';
import Preview from './Login/preview';
import RefilSchedule from './Order/refilSchedule';
import OrderSuccess from './Order/OrderSuccessful/orderSuccess';
import OrderFailed from './Order/orderFailed/orderFailed';
import Profile from './Login/Profile/profile';


ReactDOM.render(<Profile />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
