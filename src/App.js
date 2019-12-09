import React from 'react';
import {Route} from 'react-router-dom';
import './App.css';
import Login from './Login/login';
import TokenPage from './Login/tokenPage';
import OrderFailed from './Order/orderFailed/orderFailed';
import OrderSuccess from './Order/OrderSuccessful/orderSuccess';
import RefilSchedule from './Order/refilSchedule';
import Profile from './Login/Profile/profile';
import TrackingPage from './Order/Tracking/trackingPage';
import PreviewPage from './Login/preview';

function App() {
  return (
    <div className="App">
      <Route path= "/" exact component={Login}/>
      <Route path= "/token"  component={TokenPage}/>
      <Route path= "/tracking"  component={TrackingPage}/>
      <Route path= "/refil"  component={RefilSchedule}/>
      <Route path= "/profile"  component={Profile}/>
      <Route path= "/failed"  component={OrderFailed}/>
      <Route path= "/success"  component={OrderSuccess}/>
      <Route path= "/preview"  component={PreviewPage}/>
    </div>
  );
}

export default App;
