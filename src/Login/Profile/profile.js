import React, { Component } from 'react';
import {Input,InputGroup} from 'reactstrap';
import {Button} from 'reactstrap';
import './profile.css';
import '../../Order/orderFailed/orderFailed.css';
import avatarIcon from '../../assets/avatar.png';
class Profile extends Component {
    state = {  }
    render() { 
        return ( 
            <div>
                <div className= "order-header">
                <p className= "para-header">&larr; Edit Profile</p>
                </div> 
                <div className= "edit-profile">
                <img src={avatarIcon} 
                className="avatar2" alt="logo" /> 
                </div>
                <hr className= "horizontal-line" />
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
                <Input id = "password" className = "profile-input" type= "password" placeholder="Password" />
                </InputGroup>
                </div>
                <div>
              
                <div className= "section6">
                <Button 
                outline className= "profile-btn"
                 size="lg">SAVE</Button>
                </div>
             
                </div>
            </div>
         );
    }
}
 
export default Profile;