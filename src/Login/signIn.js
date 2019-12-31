import React, { Component } from 'react';
import {Input,Button, InputGroup, Alert} from 'reactstrap'
import logo from '../assets/logo.png';
import '../Login/login.css';
import './signIn.css';
import axios from 'axios';
import Spinner from '../UI/Spinner/spinner';
class SignIn extends Component {
    state = { 
      // home_details: null
      loader: true,
      alertMessage: null,
      displayAlert: false,
      home_details: []
     }
    pushToNextPage = () => {
        this.props.history.push({
          pathname: '/signup'
        })
      
      }
    forgotPassword = () => {
      this.props.history.push({
        pathname: '/password'
      })
    }
  
      logInUser = () => {
        this.setState({loader: false})
        const data = {
            phone: document.querySelector('#number').value,
            password: document.querySelector('#password').value,
         
          }
        axios.post('http://sargasoms.com/api/customer/?API_flag=customerlogin', {...data})
                .then((res) => {
                this.setState({loader: true})
                    const response = res.data;
                    console.log(response.status)
                    const token = response.token;
                    localStorage.setItem("token", token);
                   
                    if (response.status === 1001) {
                      const home_details = response.home_details;
                      this.setState({home_details: home_details})
                      if (response.first_time === '1') {
                        this.props.history.push({
                          pathname: '/preview',
                          search: '?query=preview',
                          state: {home_details: home_details}
                        })
                      }else {
                        this.props.history.push({
                          pathname: 'home',
                          search: '?query=home',
                          state: {home_details: home_details}
                        })
                      }
                 
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
      const home_details = this.state.home_details;
      const firstname = home_details.firstname;
      const lastname = home_details.lastname;
      localStorage.setItem('lastname', lastname)
      localStorage.setItem('firstname', firstname)
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
      let show = <Spinner />
      if (this.state.loader) {
        show = (
          <div className= "sign-up">
          <div className = "Login-body">
            {showAlert}
          <InputGroup>
          <Input id = "number" className = "login-input" type= "number" placeholder="Phone Number" />
          </InputGroup>
          <br />
          <InputGroup>
          <Input id = "password" className = "login-input" type= "password" placeholder="Password" />
          </InputGroup>
          <br />
          <p onClick = {this.forgotPassword} className= "password_text">FORGOT PASSWORD?</p>
          <Button style= {{color: "white"}} outline
          onClick= {this.logInUser}
           className = "Login-btn"  size="lg">LOG IN &rarr;</Button>
          </div>
          <div className= "outer-text">
              <p>DON'T HAVE AN ACCOUNT?</p>
              <h5 onClick= {this.pushToNextPage}>REGISTER NOW</h5>
          </div>
      </div>
        )
      }
        return (  
            <div className= "Login">
        

            <header className= "Logo-header">
            <img src={logo} className="Special-logo" alt="logo" />   
            </header>
          {show}
            </div>
         );
    
    }
}
 
export default SignIn;