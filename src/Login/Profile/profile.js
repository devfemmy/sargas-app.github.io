import React, { Component } from 'react';
import {Input,InputGroup, Label, Row, Col} from 'reactstrap';
import {Button} from 'reactstrap';
import './profile.css';
import '../../Order/orderFailed/orderFailed.css';
import avatarIcon from '../../assets/avatar.png';
import axios from 'axios';
import Spinners from '../../UI/Spinner/spinner';
import errorHandler from '../../ErrorHandler/errorHandler';
import backIcon from '../../assets/back.svg';

class Profile extends Component {
    state = { 
        first_name: null,
        last_name: null,
        phone_no: null,
        email: null,
        gender: null,
        apart_no: null,
        street_name: null,
        nearest_bstop: null,
        city: null,
        state: null,
        zone: null,
        loader: true,
        error: false,
        inputDisabled: false
     }
     backToPrevPageHandler = () => {
        this.props.history.goBack();
    }
    componentDidMount (){

        // let bodyFormData = new FormData();
        const data = {
            token : localStorage.getItem('token')
        }
        this.setState({loader: false})
        axios.post('https://sargasoms.com/api/customer/?API_flag=fetchcusprofile', data )
                .then((res) => {
                console.log(res);
                this.setState({loader: true})
                    const response = res.data;
                    const firstname = response.firstname;
                    const lastname = response.lastname;
                    const nameCapitalized = firstname.charAt(0).toUpperCase() + firstname.slice(1)
                    const nameCapitalized2 = lastname.charAt(0).toUpperCase() + lastname.slice(1)
                    const phone_no = response.phone;
                    const email = response.email;
                    const gender = response.gender
                    const apart_no = response.apartment;
                    const street_name = response.street;
                    const nearest_bstop= response.street2;
                    const city= response.city;
                    const state = response.state;
                    const zone = response.zone;
                    this.setState({
                        first_name: firstname, last_name:lastname,
                        phone_no: phone_no, email: email, gender: gender,
                        apart_no: apart_no, street_name: street_name,
                        nearest_bstop: nearest_bstop,
                        city: city, state: state,
                        zone: zone

                    })
                    if (firstname === '' || lastname === '' || gender === '' || apart_no === '' || city === ''
                        || nearest_bstop === '' || state === '' || zone === ''
                    ) {
                        this.setState({inputDisabled: true})
                    }
                    document.querySelector('#firstname').value = nameCapitalized;
                    document.querySelector('#lastname').value = nameCapitalized2;
                    document.querySelector('#phone_number').value = phone_no;
                    document.querySelector('#email').value = email;
                    document.querySelector('#gender').value = gender;
                    document.querySelector('#apt').value = apart_no;
                    document.querySelector('#street').value = street_name;
                    document.querySelector('#street2').value = nearest_bstop;
                    document.querySelector('#city').value = city;
                    document.querySelector('#state').value = state;
                    console.log(response.status)
                    if (response.status === 1001) {
                      
                        // this.props.history.push({
                        //     pathname: '/token'
                        //   })
                    }
                    // const id = response.temp_id
                    // localStorage.setItem("id", id);

                    console.log(res);
                })
                .catch(error => {
                   
                this.setState({error: true, loader: true})});;
      
    }
    editProfile = () => {
        // this.setState({loader: false})
        const firstname = document.querySelector('#firstname').value;
        localStorage.setItem('usersfirstname', firstname);
        const lastname = document.querySelector('#lastname').value;
        const gender = document.querySelector('#gender').value;
        const apt = document.querySelector('#apt').value;
        const street = document.querySelector('#street').value;
        const street2 = document.querySelector('#street2').value;
        // const street2 = document.querySelector('#street2').value;

        const data = {
            firstname: document.querySelector('#firstname').value,
            lastname: document.querySelector('#lastname').value,
            phone_no: document.querySelector('#phone_number').value,
            email:  document.querySelector('#email').value,
            gender: document.querySelector('#gender').value,
            token : localStorage.getItem('token'),
            apt : document.querySelector('#apt').value,
            street: document.querySelector('#street').value,
            street2: document.querySelector('#street2').value,
            city: localStorage.getItem('city_id'),
            zone: localStorage.getItem('zone_id'),
            state: localStorage.getItem('state_id'),
            cylinder_size: localStorage.getItem('cylinder_size')
    
        }
        if (firstname === '' || lastname === '' || gender === '' || apt === '' || street === '' || street2 === '' ) {
            alert("please fill up profile correctly")
        }else {
            this.setState({loader: false})
            axios.post('http://sargasoms.com/api/customer/?API_flag=editcusprofile', data )
            .then((res) => { 
                // this.setState({loader: true})
                const response = res.data;
                if (response.status === 1001) {
                    this.setState({loader: true})
                    this.props.history.push(
                        {
                            pathname: '/home'
                        }
                    )
                }
    
                console.log(res)
            }).catch(  error => {
                   
                this.setState({error: true, loader: true})});
        }
 

    }
    render() { 
        console.log('red', this.state.first_name)
        const state = localStorage.getItem('sargas_state')
        const city = localStorage.getItem('sargas_city')
        const zone = localStorage.getItem('sargas_zone')
        let showProfile = <Spinners />
        if (this.state.loader) {
            showProfile = (
            <div>
               <div className= "section10">
                <Row>
                    <Col>
                    <Label className= "profile-label">First Name:</Label>
                    <InputGroup>
                    <Input disabled= {!this.state.inputDisabled}  id= "firstname" type= "text"  className = "profile-input" placeholder="First Name" />
                    </InputGroup>
                    </Col>
                    <Col>
                    <Label className= "profile-label">Last Name:</Label>
                    <InputGroup>
                    <Input disabled= {!this.state.inputDisabled}  id= "lastname" type= "text"  className = "profile-input" placeholder="Last Name" />
                    </InputGroup>
                    </Col>
                </Row>
            
                <br />
                <Row>
                    <Col>
                        <Label className= "profile-label">Phone No:</Label>
                        <InputGroup>
                        <Input disabled id = "phone_number" className = "profile-input" type= "number" placeholder="Phone Number" />
                        </InputGroup>
                    </Col>
                    <Col>
                    <Label className= "profile-label">Gender:</Label>
                <InputGroup>
                <Input disabled= {!this.state.inputDisabled} id= "gender" type= "select"  className = "profile-input" placeholder="Gender">
                    <option id="">
                        Male
                    </option>
                    <option id="gender">
                        Female
                    </option>
                </Input>
                </InputGroup>
                  
                    </Col>
                </Row>
     
                <br />
                <Label className= "profile-label">Email:</Label>
                    <InputGroup>
                    <Input disabled id= "email" type= "email"  className = "profile-input" placeholder="Email" />
                    </InputGroup>
                <br />
                <Row>
                    <Col>
                    <Label className= "profile-label">Apt/House No:</Label>
                    <InputGroup>
                    <Input disabled= {!this.state.inputDisabled} id= "apt" type= "number"  className = "profile-input" placeholder="Apartment No" />
                    </InputGroup>
                    </Col>
                    <Col>
                    <Label className= "profile-label">Street:</Label>
                    <InputGroup>
                    <Input disabled= {!this.state.inputDisabled} id= "street" type= "text"  className = "profile-input" placeholder="Street Name" />
                    </InputGroup>
                    </Col>
                </Row>
            
                <br />
                <Label className= "profile-label">Nearest Bus Stop:</Label>
                    <InputGroup>
                    <Input disabled= {!this.state.inputDisabled} id= "street2" type= "text"  className = "profile-input" placeholder="Nearest B/Stop" />
                </InputGroup>
                <br />
                <Row>
                    <Col>
                    <Label className= "profile-label">City:</Label>
                    <InputGroup>
                    <Input disabled= {!this.state.inputDisabled}  type= "select"  className = "profile-input" placeholder="city">
                    <option id="">
                            Select City
                        </option>
                    <option selected id="">
                            {city}
                    </option>
                
                    </Input>
                    </InputGroup>
                    </Col>
                    <Col>
                    <Label className= "profile-label">State:</Label>
                        <InputGroup>
                        <Input disabled= {!this.state.inputDisabled} type= "select"  className = "profile-input" placeholder="state">
                            <option id="">
                                Select State
                            </option>
                            <option selected id="">
                                {state}
                            </option>
                    
                        </Input>
                        </InputGroup>
                    </Col>
                </Row>
                <br />
                <Row>
                    <Col>
                    <Label className= "profile-label">Zone:</Label>
                    <InputGroup>
                    <Input disabled= {!this.state.inputDisabled}  id= "zone" type= "select"  className = "profile-input" placeholder="city">
                    <option id="">
                            Select Zone
                        </option>
                    <option selected  id="">
                            {zone}
                    </option>
                
                    </Input>
                    </InputGroup>
                    </Col>
                </Row>
                
              

                </div>
               <div className= "section6">
               <Button 
               onClick= {this.editProfile}
               outline className= "profile-btn"
                size="lg">SAVE</Button>
               </div>
            </div>
 
                
            )
        }
        return ( 
            <div style={{backgroundColor: 'white'}}>
               <div id= "sticky_element" className= "payment-header2">
               <p style={{width: '500px',paddingTop: '5%', color: 'white', fontSize: '15px'}}>
                    <img onClick={this.backToPrevPageHandler} src={backIcon} style={{float: 'left'}} alt= "float" />
                   &nbsp; &nbsp; Profile
                </p> 
                   
                </div> 
                <div className= "edit-profile">
                <img src={avatarIcon} 
                className="avatar2" alt="logo" /> 
                </div>
                <hr className= "horizontal-line" />
                    {showProfile}
                <div>
              
 
             
                </div>
            </div>
         );
    }
}
 
export default errorHandler (Profile, axios);