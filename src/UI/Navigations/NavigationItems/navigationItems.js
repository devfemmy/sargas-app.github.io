import React from 'react';
// import './navigationItems.css'
import './navigationItems.css';
import '../../SideDrawer/sideDrawer.css';
import home from '../../../assets/home-icon.svg';
import restaurant from '../../../assets/restaurants-icon.svg'
import profile from '../../../assets/profile-icon.svg';
import pointStatistics from '../../../assets/points-statistics-icon.svg';
import notications from '../../../assets/notification-icon.svg';
import transactions from '../../../assets/transaction-icon.svg';
import survey from '../../../assets/survey-icon.svg';
import promoCode from '../../../assets/promo-icon.svg';
import security from '../../../assets/security-icon.svg';
// import logOut from '../../../assets/logout.svg';
import NavigationItem from '../NavigationItem/navigationItem';

const NavigationItems = (props) => (
    <ul className = "NavigationItems">
        
    <NavigationItem link= '/'>
    <p className= "side-icons">
        <strong><span>
        <img src={home} className="App-logo" alt="logo" />
        </span>&nbsp;&nbsp;&nbsp;<span >Home</span></strong>
    </p>
    </NavigationItem>
    <NavigationItem link= '/restaurant'>
    <p className= "side-icons">
        <strong><span>
        <img src={restaurant} className="App-logo" alt="logo" />
        </span>&nbsp;&nbsp;&nbsp;<span >Restaurants</span></strong>
    </p>
    </NavigationItem>
    <NavigationItem link= '/profile'>
    <p className= "side-icons">
        <strong><span>
        <img src={profile} className="App-logo" alt="logo" />
        </span>&nbsp;&nbsp;&nbsp;<span >Profile</span></strong>
    </p>
    </NavigationItem>
    <NavigationItem link= '/stats'>
    <p className= "side-icons">
        <strong><span>
        <img src={pointStatistics} className="App-logo" alt="logo" />
        </span>&nbsp;&nbsp;&nbsp;<span >Points Statistics</span></strong>
    </p>
    </NavigationItem>
    <NavigationItem link= '/notifications'>
    <p className= "side-icons">
        <strong><span>
        <img src={notications} className="App-logo" alt="logo" />
        </span>&nbsp;&nbsp;&nbsp;<span >Notifications</span></strong>
    </p>
    </NavigationItem>
    <NavigationItem link= '/transactions'>
    <p className= "side-icons">
        <strong><span>
        <img src={transactions} className="App-logo" alt="logo" />
        </span>&nbsp;&nbsp;&nbsp;<span >Recent Transactions</span></strong>
    </p>
    </NavigationItem>
    <NavigationItem link= '/survey'>
    <p className= "side-icons">
        <strong><span>
        <img src={survey} className="App-logo" alt="logo" />
        </span>&nbsp;&nbsp;&nbsp;<span >Survey</span></strong>
    </p>
    </NavigationItem>
    <NavigationItem link= '/promo-code'>
    <p className= "side-icons">
        <strong><span>
        <img src={promoCode} className="App-logo" alt="logo" />
        </span>&nbsp;&nbsp;&nbsp;<span >Promo Code</span></strong>
    </p>
    </NavigationItem>
    <NavigationItem link= '/security'>
    <p className= "side-icons">
        <strong><span>
        <img src={security} className="App-logo" alt="logo" />
        </span>&nbsp;&nbsp;&nbsp;<span >Security</span></strong>
    </p>
    </NavigationItem>

    
    {/* <NavigationItem link = "/">Burger Builder</NavigationItem>
    <NavigationItem link = "/orders">Orders</NavigationItem> */}
    </ul>
);

export default NavigationItems