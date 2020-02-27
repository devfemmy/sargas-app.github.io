import React from 'react';
import {Route, Switch} from 'react-router-dom';
import { ProtectedRoute } from './auth/protected.route';
import { GuestRoute } from './auth/guest.route';
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
import History from './Order/OrderHistory/history';
import Freebies from './Order/Freebies/freebies';
import Blog from './Order/Freebies/blog';
import UIModal from './UI/UIModal/ui-modal';


function App() {
  return (
    <div className="App">
      <Switch>
      <GuestRoute exact path= "/"  component={SignIn}/>
      <GuestRoute exact path= "/token"  component={TokenPage}/>
      <GuestRoute exact path= "/password"  component={ForgotPassword}/>
      <GuestRoute exact path= "/signup"  component={Login}/>

      <ProtectedRoute exact path= "/home"  component={HomePage}/>
     
      <ProtectedRoute exact path= "/tracking"  component={TrackingPage}/>
      <ProtectedRoute exact path= "/refil"  component={RefilSchedule}/>
      <ProtectedRoute exact path= "/profile"  component={Profile}/>
      <ProtectedRoute exact path= "/failed"  component={OrderFailed}/>
      <ProtectedRoute exact path= "/success"  component={OrderSuccess}/>
      <ProtectedRoute exact path= "/preview"  component={PreviewPage}/>
      <ProtectedRoute exact path= "/payment"  component={PaymentPage}/>
      <ProtectedRoute exact path= "/payment_method"  component={PaymentMethod}/>
      <ProtectedRoute exact path= "/card"  component={AddCard}/>
      
      <ProtectedRoute exact path= "/pricing"  component={ConfirmOrder}/>
      <ProtectedRoute exact path= "/paystack"  component={PayStackPay}/>
      <ProtectedRoute exact path="/modal" component={UIModal} />
      <ProtectedRoute exact path= "/history"  component={History}/>
      <ProtectedRoute exact path= "/freebies"  component={Freebies}/>
      <ProtectedRoute exact path= "/blog"  component={Blog}/>
      <Route path="*" component={() => "404 NOT FOUND"} />
      
      </Switch>

      


    </div>
  );
}

export default App;
