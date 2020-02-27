import React from 'react';
// import './navigationItems.css'
import './navigationItems.css';
import '../../SideDrawer/sideDrawer.css';
import home from '../../../assets/home_icon.svg';
import order from '../../../assets/order_history_icon.svg';
import profile from '../../../assets/profile.svg';
// import payment from '../../../assets/payment_icon.svg';
// import trackIcon from '../../../assets/tracking_icon.svg';
import freebies from '../../../assets/freebies_icon.svg';
import NavigationItem from '../NavigationItem/navigationItem';
// import auth from '../../../auth/auth';

const NavigationItems = (props) => (
    <ul className = "NavigationItems">
        
    <NavigationItem link= '/home'>
    <p className= "side-icons">
    <strong><span>
        <img src={home} className="home-logo" alt="logo" />
        </span>&nbsp;&nbsp;<span className= "nav-text">Home</span></strong>
    </p>
    </NavigationItem>
    <NavigationItem link= '/profile'>
    <p className= "side-icons">
    <strong><span>
        <img src={profile} className="home-logo" alt="logo" />
        </span>&nbsp;&nbsp;<span className= "nav-text">Profile</span></strong>
    </p>
    </NavigationItem>
    <NavigationItem link= '/history'>
    <p className= "side-icons">
    <strong><span>
        <img src={order} className="home-logo" alt="logo" />
        </span>&nbsp;&nbsp;<span className= "nav-text">History</span></strong>
    </p>
    </NavigationItem>
 
    {/* <NavigationItem link= '/tracking'>
    <p className= "side-icons">
    <strong><span>
        <img src={trackIcon} className="home-logo" alt="logo" />
        </span>&nbsp;<span className= "nav-text">Track Orders</span></strong>
    </p>
    </NavigationItem> */}
    <NavigationItem link= '/freebies'>
    <p className= "side-icons">
    <strong><span>
        <img src={freebies} className="home-logo" alt="logo" />
        </span>&nbsp;&nbsp;&nbsp;<span className= "nav-text">Freebies</span></strong>
    </p>
    </NavigationItem>
    <NavigationItem link= '/blog'>
    <p className= "side-icons">
    <strong><span>
        <img src={freebies} className="home-logo" alt="logo" />
        </span>&nbsp;&nbsp;&nbsp;<span className= "nav-text">Blog</span></strong>
    </p>
    </NavigationItem>
 

    </ul>
);

export default NavigationItems