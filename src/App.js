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
import PaymentPage from './Order/PaymentPage/paymentPage';
import SignIn from './Login/signIn';
import PaymentMethod from './Order/PaymentPage/paymentMethod';
import AddCard from './Order/PaymentPage/addCard';
import HomePage from './Home/homePage';
import ConfirmOrder from './Order/confirmOrder';
import PayStackPay from './Order/paystackPay';
import ForgotPassword from './Login/forgotPassword';

function App() {
  return (
    <div className="App">
      <Route path= "/" exact component={SignIn}/>
      <Route path= "/home" exact component={HomePage}/>
      <Route path= "/token"  component={TokenPage}/>
      <Route path= "/tracking"  component={TrackingPage}/>
      <Route path= "/refil"  component={RefilSchedule}/>
      <Route path= "/profile"  component={Profile}/>
      <Route path= "/failed"  component={OrderFailed}/>
      <Route path= "/success"  component={OrderSuccess}/>
      <Route path= "/preview"  component={PreviewPage}/>
      <Route path= "/payment"  component={PaymentPage}/>
      <Route path= "/payment_method"  component={PaymentMethod}/>
      <Route path= "/card"  component={AddCard}/>
      <Route path= "/signup"  component={Login}/>
      <Route path= "/pricing"  component={ConfirmOrder}/>
      <Route path= "/paystack"  component={PayStackPay}/>
      <Route path= "/password"  component={ForgotPassword}/>


    </div>
  );
}

export default App;
