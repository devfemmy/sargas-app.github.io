import React, { Component } from 'react';
import './tokenPage.css';
import {Alert} from 'reactstrap';
import PinInput from 'react-pin-input';
import logo from '../assets/logo_new.svg';
import axios from 'axios';
import Spinners from '../UI/Spinner/spinner';
class TokenPage extends Component {
    state = { 
        loader: true,
        alertMessage: null,
        displayAlert: false
     }
    pushToNextPage = (value) => {
        // const value = value
        this.setState({loader: false})
        const data = {
             id :localStorage.getItem('id'),
             otp : value,
        }
   
          axios.post('http://sargasoms.com/api/customer/?API_flag=validateotp', data)
              .then((res) => {
              this.setState({loader: true})
                  const response = res.data;
                  if (response.status === 1001) {
                    alert('Registration Successful!')
                      this.props.history.push({
                          pathname: '/'
                        })
                  } else if (response.status === 2001) {
                    const alertMessage = response.message
                    this.setState({alertMessage: alertMessage, displayAlert: true})
                  } else if (response.status === 2010) {
                    const alertMessage = response.message
                    this.setState({alertMessage: alertMessage, displayAlert: true})
                  }

                  console.log(res);
              })
              .catch((err) => {
                  //handle error
                  console.log(err);
              });
    
    }
    render() { 
        let showAlert = null;
        if (this.state.displayAlert) {
          showAlert = 
            <Alert>
              {this.state.alertMessage}
            </Alert>
                setTimeout(() => {
                          this.setState({displayAlert: false})
                         
                }, 3000);
        }
        let show = <Spinners />
        if (this.state.loader) {
            show = (
                
                <PinInput 
                className= "pin-input"
                length={4} 
                initialValue=""
                secret 
                onChange={(value, index) => {}} 
                type="numeric" 
                style={{padding: '10px', marginLeft: '3rem'}}  
                inputStyle={{borderColor: 'white'}}
                inputFocusStyle={{borderColor: 'blue'}}
                onComplete={(value, index) => {this.pushToNextPage(value)}}
                />
            )
        }
        return ( 
        <div className = "token-top">
        <span className = "arrow-back"></span>
            <header className= "token-header">
            <img src={logo} className="Special-logo" alt="logo" />   
            </header>
            <div className = "token-body">
            <div className= "token">
                <h4>Please Enter the Token sent to you</h4>
                {showAlert}
                <br />
            <div className= "token-div">
            {show}
            </div>
            
            <br />
            </div>
       
            </div>

            </div>
         );
    }
}
 
export default TokenPage;