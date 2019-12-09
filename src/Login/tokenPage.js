import React, { Component } from 'react';
import './tokenPage.css';
import {Button} from 'reactstrap';
import PinInput from 'react-pin-input';
import logo from '../assets/logo.png';
class TokenPage extends Component {
    state = {  }
    render() { 
        return ( 
        <div className = "token-top">
        <span className = "arrow-back">&larr;</span>
            <header className= "token-header">
            <img src={logo} className="Special-logo" alt="logo" />   
            </header>
            <hr />
            <div className = "token-body">
            <div className= "token">
                <h4>Please Enter the Token sent to you</h4>
                <br />
                <PinInput 
                    length={6} 
                    initialValue=""
                    secret 
                    onChange={(value, index) => {}} 
                    type="numeric" 
                    style={{padding: '10px'}}  
                    inputStyle={{borderColor: 'white'}}
                    inputFocusStyle={{borderColor: 'blue'}}
                    onComplete={(value, index) => {}}
                    />
                    <br />
            </div>
       
            </div>

            </div>
         );
    }
}
 
export default TokenPage;