import React, { Component } from 'react';
import {Input,Button, InputGroup, Alert} from 'reactstrap'
import logo from '../assets/logo_new.svg';
import '../Login/login.css';
import axios from '../axios-req';
import Spinners from '../UI/Spinner/spinner';
import errorHandler from '../ErrorHandler/errorHandler';


// import SideDrawer from '../UI/SideDrawer/sideDrawer.js';
// import menu from '../assets/menu.png'
class Login extends Component {
    state = {  
        showSideDrawer : false,
        loader: true,
        error: false
    }
    sideDrawerHandler = () => {
        this.setState({showSideDrawer: false})
     }

     sideDrawerToggleHandler = () => {
        this.setState((prevState) => {
        return {showSideDrawer: !prevState.showSideDrawer};
           });
     }
     pushToNextPage = () => {
         this.setState({loader: false})
        const data = {
            phone: document.querySelector('#number').value,
            password: document.querySelector('#password').value,
            email: document.querySelector('#email').value
         
          }
          axios.post('http://sargasoms.com/api/customer/?API_flag=registercustomer', {...data})
                .then((res) => {
                this.setState({loader: true})
                    const response = res.data;
                    if (response.status === 1001) {

                        this.props.history.push({
                            pathname: '/token'
                          })
                          const id = response.temp_id
                          localStorage.setItem("id", id);
                    }
                    else if (response.status === 2001) {
                        const alertMessage = response.message
                        this.setState({alertMessage: alertMessage, displayAlert: true})
                      } else if (response.status === 2010) {
                        const alertMessage = response.message
                        this.setState({alertMessage: alertMessage, displayAlert: true})
                      }
                 

                    console.log(res);
                })
                .catch(  error => {
                   
                    this.setState({error: true, loader: true})});
                    
      
      }
    render() { 
        let showAlert = null;
        if (this.state.displayAlert) {
          showAlert = 
            <Alert color="info">
              {this.state.alertMessage}
            </Alert>
                setTimeout(() => {
                          this.setState({displayAlert: false})
                         
                }, 3000);
        }
        let show = <Spinners />
        if (this.state.loader) {
            show = (
                <div className= "sign-up2">
                <div className = "Login-body2">
                    {showAlert}
                <InputGroup>
                <Input id= "email" type= "email"  className = "login-input" placeholder="Email Address" />
                </InputGroup>
                <br />
                <InputGroup>
                <Input id = "number" className = "login-input" type= "number" placeholder="Phone Number" />
                </InputGroup>
                <br />
                <InputGroup>
                <Input id = "password" className = "login-input" type= "password" placeholder="Password" />
                </InputGroup>
                <br />
                <InputGroup>
                <Input id = "Confirm Password" className = "login-input" type= "password" placeholder="Confirm Password" />
                </InputGroup>
                <br />
                <Button style= {{color: "white"}} outline
                onClick= {this.pushToNextPage}
                 className = "Login-btn"  size="lg">SIGN UP</Button>
                </div>
            </div>
            )
        }
        return ( 
            <div className= "Login">
        

            <header className= "Logo-header2">
            <img src={logo} className="Special-logo" alt="logo" />   
            </header>
            {show}
            </div>
         );
    }
}
 
export default errorHandler(Login, axios);