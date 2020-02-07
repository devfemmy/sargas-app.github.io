import React, { Component } from 'react';
import './tokenPage.css';
import {Alert} from 'reactstrap';
import PinInput from 'react-pin-input';
import logo from '../assets/sargas_new_logo2.png';
import axios from 'axios';
import Spinners from '../UI/Spinner/spinner';
import tokenImg from '../assets/token_page.svg';
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
                secret={false}
                onChange={(value, index) => {}} 
                type="numeric" 
                style={{padding: '10px'}}  
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
                 <img src= {tokenImg} className= "token-img" alt= "token" />
            </header>
            <div className = "token-body">
            <div className= "token">
                {showAlert}
                <br />
            <div className= "token-div">
            {show}
           
            </div>
          
            <br />
            </div>
            <div className= "token-text-session">
            <p>Enter 4 digit number sent to your phone number</p>
            </div>
           
            </div>

            </div>
         );
    }
}
 
export default TokenPage;