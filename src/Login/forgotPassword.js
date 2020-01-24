import React, { Component } from 'react';
import {Input,Button, InputGroup,Alert} from 'reactstrap';
import Spinners from '../UI/Spinner/spinner.js';
import logo from '../assets/logo_new.svg';
import '../Login/login.css';
import './signIn.css';
import axios from 'axios';
import errorHandler from '../ErrorHandler/errorHandler.js';
import backIcon from '../assets/back.svg';

class ForgotPassword extends Component {
    state = { 
        loader: true,
        alertMessage: null,
        displayAlert: false,
        error: false
     }
     backToPrevious = () => {
         this.props.history.goBack()
     }
    getPassword = () => {
        this.setState({loader: false});
        const data = { 
            email: document.querySelector('#email').value
        }
        axios.post('http://sargasoms.com/api/customer/?API_flag=forgot_pass', data)
        .then(res => {
            console.log(res)
            this.setState({loader: true})
            const response = res.data;
            if (response.status === 1001) {
                const alertMessage = response.message
                this.setState({alertMessage: alertMessage, displayAlert: true})
            }
            else if (response.status === 2001) {
                const alertMessage = response.message
                this.setState({alertMessage: alertMessage, displayAlert: true})
            } else if (response.status === 2010) {
                const alertMessage = response.message
                this.setState({alertMessage: alertMessage, displayAlert: true})
              }
        }).catch(error => {
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
        let showResult = <Spinners />
        if (this.state.loader) {
            showResult = (
                <div className = "Login-body3">
                      {showAlert}
                <InputGroup>
                <Input id = "email" className = "login-input" type= "email" placeholder="Email" />
                </InputGroup>
                <br />
                <Button style= {{color: "white"}} outline
                onClick= {this.getPassword}
                 className = "Login-btn"  size="lg">SUBMIT</Button>
                </div>
            )
        }
        return (  
            <div>
        <div className= "Login">
            <div className= "back-div">
            <img onClick= {this.backToPrevious} src= {backIcon}  alt= "backIcon" className= "back-icon2" />
            </div>
       
        <header className= "Logo-header">
        <img src={logo} className="Special-logo" alt="logo" />   
        </header>
      
        <div className= "sign-up">
            
            {showResult}
         
        </div>
        </div>
    </div>
        );
    }
}
 
export default errorHandler(ForgotPassword, axios);