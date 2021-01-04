import React, { Component } from 'react';
import {Button, Alert,} from 'reactstrap'
import { Field, formInputData, formValidation } from 'reactjs-input-validator';
import logo from '../assets/logo_new.svg';
import '../Login/login.css';
import './signIn.css';
import axios from 'axios';
import Spinners from '../UI/Spinner/spinner';
import errorHandler from '../ErrorHandler/errorHandler';
import registerBg from '../assets/new_register_bg.svg';
import auth from '../auth/auth'
// import Spinner from 'reactstrap';
class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loader: true,
      alertMessage: null,
      displayAlert: false,
      home_details: [],
      error: false,
      data: {}
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
   
  }
  handleChange(event, inputValue, inputName, validationState, isRequired) {
    const value = (event && event.target.value) || inputValue;
    const { data } = this.state;
    data[inputName] = { value, validation: validationState, isRequired };
    this.setState({
      data,
    });
    // if you want access to your form data
    const formData = formInputData(this.state.data); // eslint-disable-line no-unused-vars
    // tells you if the entire form validation is true or false
    const isFormValid = formValidation(this.state.data); // eslint-disable-line no-unused-vars
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
  
      handleSubmit = (event) => {
      event.preventDefault();
      const isFormValid = formValidation(this.state.data);
   
      if (isFormValid) {
        this.setState({loader: false})
        const data = {
          phone: this.state.data.phone.value.trim(),
          password: this.state.data.password.value.trim(),
       
        }
        
        
        axios.post('https://sargasoms.com/api/customer/?API_flag=customerlogin', {...data})
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
                // const city_id = home_details.city_id;
                const zone_id = home_details.zone_id;
                const state = home_details.state;
                // localStorage.setItem('city_id', city_id);
                localStorage.setItem('zone_id', zone_id);
                localStorage.setItem('state', state);
                this.setState({home_details: home_details})
                if (response.first_time === '1') {
                  auth.login(() => {
                    this.props.history.push({
                      pathname: '/preview',
                      search: '?query=preview',
                      state: {home_details: home_details}
                    })
                  });

                }else {
                  auth.login(() => {
                    this.props.history.push('/home');
                  });
                  // this.props.history.push({
                  //   pathname: 'home',
                  //   // search: '?query=home',
                  //   // state: {home_details: home_details}
                  // })
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
            <Field
                  className= "login-input"
                  validator="isNumeric" required minLength={11}
                  requiredErrMsg = "Required!"
                  minLengthErrMsg="Invalid Characters"
                 name="phone" type="number" placeholder="Phone Number"
                  onChange={this.handleChange}
                  value={this.state.data.phone}
                  shouldValidateInputs={this.state.shouldValidateInputs}
                />
                <Field
                className= "login-input"
                requiredErrMsg = "Required!"
                validator="isAlphanumeric" required minLength={8}
                minLengthErrMsg="Short password. Try one with atleast 8 characters"
               name="password" type="password" placeholder="Password"
                onChange={this.handleChange}
                value={this.state.data.password}
                shouldValidateInputs={this.state.shouldValidateInputs}
                />
                
          <br />
          <p onClick = {this.forgotPassword} className= "password_text">FORGOT PASSWORD?</p>
          <Button
          onClick= {this.handleSubmit}
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
            <div>
            <img src= {registerBg} alt= "registerbg" />
            </div> 
            </header>
          {show}
            </div>
         );
    
    }
}
 
export default errorHandler (SignIn, axios);