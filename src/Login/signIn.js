import React, { Component } from 'react';
import {Input,Button, InputGroup, Alert,} from 'reactstrap'
import logo from '../assets/logo_new.svg';
import '../Login/login.css';
import './signIn.css';
import axios from 'axios';
import Spinners from '../UI/Spinner/spinner';
import errorHandler from '../ErrorHandler/errorHandler';
// import Spinner from 'reactstrap';
class SignIn extends Component {
    state = { 
      // home_details: null
      loader: true,
      alertMessage: null,
      displayAlert: false,
      home_details: [],
      error: false
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
         const phone =document.querySelector('#number').value;
         const password = document.querySelector('#password').value;
          if (phone === '' || password === '') {
            alert("please fill up details correctly")
            this.setState({loader: true})
        }else {
          axios.post('http://sargasoms.com/api/customer/?API_flag=customerlogin', {...data})
          .then((res) => {
          this.setState({loader: true})
              const response = res.data;
              console.log(response.status)
              const token = response.token;
              localStorage.setItem("token", token);
             
              if (response.status === 1001) {
                const home_details = response.home_details;
                const usersfirstname = home_details.firstname;
                const userslastname = home_details.lastname;
                console.log(usersfirstname)
                localStorage.setItem('usersfirstname', usersfirstname);
                localStorage.setItem('userslastname', userslastname);
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
          .catch(  error => {
                   
            this.setState({error: true, loader: true})});
        }
 
      
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
          <Alert  color="info">
            {this.state.alertMessage}
          </Alert>
              setTimeout(() => {
                        this.setState({displayAlert: false})
                       
              }, 3000);
      }
      let show = <Spinners />
     
      if (this.state.loader) {
        show = (
          <div className= "sign-up">
          <div className = "Login-body">
            {showAlert}
          <InputGroup>
          <Input id = "number"  className = "login-input" type= "number" placeholder="Phone Number" />
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
 
export default errorHandler (SignIn, axios);