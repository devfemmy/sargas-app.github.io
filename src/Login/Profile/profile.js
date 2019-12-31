import React, { Component } from 'react';
import {Input,InputGroup} from 'reactstrap';
import {Button} from 'reactstrap';
import './profile.css';
import '../../Order/orderFailed/orderFailed.css';
import avatarIcon from '../../assets/avatar.png';
import axios from 'axios';
import Spinner from '../../UI/Spinner/spinner';
class Profile extends Component {
    state = { 
        first_name: null,
        last_name: null,
        phone_no: null,
        email: null,
        gender: null,
        apart_no: null,
        street_name: null,
        loader: true
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
        axios.post('http://sargasoms.com/api/customer/?API_flag=fetchcusprofile', data )
                .then((res) => {
                console.log(res);
                this.setState({loader: true})
                    const response = res.data;
                    const firstname = response.firstname;
                    const lastname = response.lastname;
                    const phone_no = response.phone;
                    const email = response.email;
                    const gender = response.gender
                    const apart_no = response.apartment;
                    const street_name = response.street;
                    this.setState({
                        first_name: firstname, last_name:lastname,
                        phone_no: phone_no, email: email, gender: gender,
                        apart_no: apart_no, street_name: street_name
                    })
                    document.querySelector('#firstname').value = firstname;
                    document.querySelector('#lastname').value = lastname;
                    document.querySelector('#phone_number').value = phone_no;
                    document.querySelector('#email').value = email;
                    document.querySelector('#gender').value = gender;
                    document.querySelector('#apt').value = apart_no;
                    document.querySelector('#street').value = street_name;
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
                .catch((err) => {
                    //handle error
                    console.log(err);
                });
      
    }
    editProfile = () => {
        // this.setState({loader: false})
        const firstname = document.querySelector('#firstname').value;
        const lastname = document.querySelector('#lastname').value;
        const gender = document.querySelector('#gender').value;
        const apt = document.querySelector('#apt').value;
        const street = document.querySelector('#street').value;
        const data = {
            firstname: document.querySelector('#firstname').value,
            lastname: document.querySelector('#lastname').value,
            phone_no: document.querySelector('#phone_number').value,
            email:  document.querySelector('#email').value,
            gender: document.querySelector('#gender').value,
            token : localStorage.getItem('token'),
            apt : document.querySelector('#apt').value,
            street: document.querySelector('#street').value,
            city: localStorage.getItem('city_id'),
            zone: localStorage.getItem('zone_id'),
            state: localStorage.getItem('state'),

    
        }
        if (firstname === '' || lastname === '' || gender === '' || apt === '' || street === '') {
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
            }).catch(
                err => console.log(err)
            )
        }
 

    }
    render() { 
        let showProfile = <Spinner />
        if (this.state.loader) {
            showProfile = (
            <div>
               <div className= "section10">
                <InputGroup>
                <Input id= "firstname" type= "text"  className = "profile-input" placeholder="First Name" />
                </InputGroup>
                <br />
                <InputGroup>
                <Input id= "lastname" type= "text"  className = "profile-input" placeholder="Last Name" />
                </InputGroup>
                <br />
                <InputGroup>
                <Input id = "phone_number" className = "profile-input" type= "number" placeholder="Phone Number" />
                </InputGroup>
                <br />
                <InputGroup>
                <Input id= "email" type= "email"  className = "profile-input" placeholder="Email" />
                </InputGroup>
                <br />
                <InputGroup>
                <Input id= "gender" type= "text"  className = "profile-input" placeholder="Gender" />
                </InputGroup>
                <br />
                <InputGroup>
                <Input id= "apt" type= "number"  className = "profile-input" placeholder="Apartment No" />
                </InputGroup>
                <br />
                <InputGroup>
                <Input id= "street" type= "text"  className = "profile-input" placeholder="Street Name" />
                </InputGroup>

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
            <div>
                <div className= "order-header">
                <p className= "para-header"><span onClick= {this.backToPrevPageHandler}>&larr; </span>&nbsp;&nbsp;&nbsp;&nbsp; Edit Profile</p>
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
 
export default Profile;