import React from 'react';
// import './NavigationItem.css';
import './navigationItem.css';
import {NavLink} from 'react-router-dom'

const NavigationItem = (props) => (
        <div className = "NavigationItem">
        <NavLink exact activeClassName = "active" 
        to = {props.link}>{props.children}</NavLink>
        </div>
);

export default NavigationItem; 