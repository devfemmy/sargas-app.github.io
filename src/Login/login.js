import React, { Component } from 'react';
import {Input,Button,InputGroup, Alert, Row, Col} from 'reactstrap';
// import { AvForm, AvGroup, AvInput } from 'availity-reactstrap-validation';
import registerBackbg from '../assets/bike_man.svg';
import '../Login/login.css';
import axios from '../axios-req';
import Spinners from '../UI/Spinner/spinner';
import errorHandler from '../ErrorHandler/errorHandler';
import backIcon from '../assets/back.svg';



// import SideDrawer from '../UI/SideDrawer/sideDrawer.js';
// import menu from '../assets/menu.png'
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSideDrawer : false,
      loader: true,
      error: false,
      isGoing: false,
      buttonDisabled: false
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }
    // state = {  
    //     showSideDrawer : false,
    //     loader: true,
    //     error: false,
    //     isChecked: false
    // }
    sideDrawerHandler = () => {
        this.setState({showSideDrawer: false})
     }
     backToPrevious = () => {
      this.props.history.goBack()
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
          const email = document.querySelector('#email').value;
          const phone = document.querySelector('#number').value;
          const password = document.querySelector('#password').value;
          if (email === '' || password === '' || phone === '') {
            alert("please fill up details correctly")
            this.setState({loader: true})
        }else {
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

                    
      
      }
      handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
    
        this.setState({
          [name]: value,
          buttonDisabled: true
        });
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
                <p style= {{fontSize: '14px'}}><input 
                 name="isGoing"
                 checked={this.state.isGoing}
                  onChange={this.handleInputChange}
                type="checkbox" 
                required /> I accept the <u>Terms and Conditions</u></p>
                {/* <AvForm onSubmit={this.handleSubmit}>
                <AvGroup check>
                    <Label check>
                      <AvInput type="checkbox" name="doNotAgree" falseValue="User Does Not Agreed" /> Agree to this!
                    </Label>
                  </AvGroup>
                </AvForm> */}
 
                <Button style= {{color: "white"}} outline
                onClick= {this.pushToNextPage}
                disabled= {!this.state.isGoing}
                 className = "Login-btn"  size="lg">SIGN UP</Button>

                </div>
            </div>
            )
        }
        return ( 
            <div className= "Login">
            <div className= "back-div">
              <Row>
                  <Col xs= "2"><img onClick= {this.backToPrevious} src= {backIcon}  alt= "backIcon" className= "back-icon2" /></Col>
                  <Col xs= "7">
                      <p style={{color: 'white'}}>Register</p>
                  </Col>
              </Row>
          

            </div>
            

            <header className= "Logo-header4">
              <div className= "register-session-div">
                <Row>
                  <Col xs= "7">
                    <h4 className= "tapped-button">Tap a button, get a refill...</h4>
                  </Col>
                  <Col  xs= "5">
                  <img src={registerBackbg} alt="logo" />  
                  </Col>
                </Row>
              </div>

          
         
          
            </header>
            {show}
            </div>
         );
    }
}
 
export default errorHandler(Login, axios);