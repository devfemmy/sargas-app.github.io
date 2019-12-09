import React, { Component } from 'react';
import {Input,Button, InputGroup} from 'reactstrap'
import logo from '../assets/logo.png';
import '../Login/login.css';
import SideDrawer from '../UI/SideDrawer/sideDrawer.js';
import menu from '../assets/menu.png'
class Login extends Component {
    state = {  
        showSideDrawer : false
    }
    sideDrawerHandler = () => {
        this.setState({showSideDrawer: false})
     }

     sideDrawerToggleHandler = () => {
        this.setState((prevState) => {
        return {showSideDrawer: !prevState.showSideDrawer};
           });
     }
    render() { 
        return ( 
            <div className= "Login">
        

            <header className= "Logo-header">
            <img src={logo} className="Special-logo" alt="logo" />   
            </header>
            <div className= "sign-up">
                <div className = "Login-body">
                <InputGroup>
                <Input id= "username" type= "email"  className = "login-input" placeholder="Email Address" />
                </InputGroup>
                <br />
                <InputGroup>
                <Input id = "password" className = "login-input" type= "number" placeholder="Phone Number" />
                </InputGroup>
                <br />
                <InputGroup>
                <Input id = "password" className = "login-input" type= "password" placeholder="Password" />
                </InputGroup>
                <br />
                <Button style= {{color: "white"}} outline color="secondary" className = "Login-btn"  size="lg">SIGN IN</Button>
                </div>
            </div>
            </div>
         );
    }
}
 
export default Login;