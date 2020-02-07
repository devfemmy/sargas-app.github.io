import React, {Component} from 'react';
import './sideDrawer.css';
// import '../../login/login.css';
import Backdrop from '../Backdrop/backdrop';
import {Card,CardBody, Col, Row } from 'reactstrap';
import clearIcon from '../../assets/clear.svg';
import auth from '../../auth/auth';
import logOut from '../../assets/log-out.svg';
import NavigationItems from '../Navigations/NavigationItems/navigationItems';
import avatarIcon from '../../assets/avatar.png';
class SideDrawer extends Component {
    state = {  }
    
    render() { 
        console.log(this.props)
       const firstname = localStorage.getItem('usersfirstname');
       const apartment = localStorage.getItem('apartment');
       const street = localStorage.getItem('street')
        // const lastname = localStorage.getItem('lastname')
        let attachedClasses = ["SideDrawer", "Close" ];
        if (this.props.open) {
            attachedClasses =  ["SideDrawer", "Open" ];
        }
        return (
            <div>
                <Backdrop show = {this.props.open} clicked = {this.props.closed}/>
                
                <div className = {attachedClasses.join(' ')}>
                <Card className = "dash-card">
                    <div>
                        
                    </div>
                    <img onClick= {this.props.closed} className= "clear-icon" src= {clearIcon} alt= "clear" />
                    <CardBody className =  "card-body">
                      
                    <Row>
                     <Col xs="4" sm="4" md="3">
                     <img src={avatarIcon} className="avatar" alt="logo" /> 
                     </Col>
                        <Col xs="8" sm="8" md="6">
                            <h4>{firstname.toUpperCase()}</h4>
                            <p style= {{opacity: '0.8'}}>{apartment} {street}</p>
                        {/* <p> Edit Profile</p> */}
                        </Col>
                    </Row>
                </CardBody>
            </Card>
                   
                    <div className= "universal-pad2">
                        <NavigationItems />
                        <div>
                            <p onClick={() => {
                                auth.logout(() => {
                                    this.props.props.history.push("/");
                                });
                                }} className= "side-icons">
                            <strong><span>
                                <img src={logOut} className="home-logo" alt="logo" />
                                </span>&nbsp;&nbsp;&nbsp;<span className= "nav-text">Log Out</span></strong>
                            </p>
                            </div>
                      
                    </div>
                </div>
                
            </div>
    
    
        );
    }
}
 
export default SideDrawer;

