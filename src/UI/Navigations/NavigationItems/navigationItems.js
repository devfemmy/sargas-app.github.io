import React from 'react';
// import './navigationItems.css'
import './navigationItems.css';
import '../../SideDrawer/sideDrawer.css';
// import home from '../../../assets/home-icon.svg';
// import restaurant from '../../../assets/restaurants-icon.svg'
// import profile from '../../../assets/profile-icon.svg';
// import pointStatistics from '../../../assets/points-statistics-icon.svg';
// import notications from '../../../assets/notification-icon.svg';
// import transactions from '../../../assets/transaction-icon.svg';
// import survey from '../../../assets/survey-icon.svg';
// import promoCode from '../../../assets/promo-icon.svg';
// import security from '../../../assets/security-icon.svg';
// import logOut from '../../../assets/logout.svg';
import NavigationItem from '../NavigationItem/navigationItem';

const NavigationItems = (props) => (
    <ul className = "NavigationItems">
        
    <NavigationItem link= '/home'>
    <p className= "side-icons">
        Home
    </p>
    </NavigationItem>
    <NavigationItem link= '/profile'>
    <p className= "side-icons">
        Profile
    </p>
    </NavigationItem>
    <NavigationItem link= '/history'>
    <p className= "side-icons">
        Orders
    </p>
    </NavigationItem>
    <NavigationItem link= '/payment'>
    <p className= "side-icons">
        Payment
    </p>
    </NavigationItem>
    <NavigationItem link= '/tracking'>
    <p className= "side-icons">
        Track Orders
    </p>
    </NavigationItem>
    <NavigationItem link= '/'>
    <p className= "side-icons">
        Freebies
    </p>
    </NavigationItem>
    <NavigationItem link= '/'>
    <p className= "side-icons">
        LogOut
    </p>
    </NavigationItem>
    </ul>
);

export default NavigationItems