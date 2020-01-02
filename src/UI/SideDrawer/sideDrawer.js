import React, {Component} from 'react';
import './sideDrawer.css';
// import '../../login/login.css';
import Backdrop from '../Backdrop/backdrop';
import {Card,CardBody, Col, Row } from 'reactstrap';

// import logOut from '../../assets/logout.svg';
import NavigationItems from '../Navigations/NavigationItems/navigationItems';
import avatarIcon from '../../assets/avatar.png';
class SideDrawer extends Component {
    state = {  }
    
    render() { 
        const firstname = localStorage.getItem('firstname');
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
                    <CardBody className =  "card-body">
                    <Row>
                     <Col xs="4" sm="4" md="3">
                     <img src={avatarIcon} className="avatar" alt="logo" /> 
                     </Col>
                        <Col xs="8" sm="8" md="6">
                            <h4>{firstname.toUpperCase()}</h4>
                        {/* <p> Edit Profile</p> */}
                        </Col>
                    </Row>
                </CardBody>
            </Card>
                   
                    <div className= "universal-pad2">
                        <NavigationItems />
                      
                    </div>
                </div>
                
            </div>
    
    
        );
    }
}
 
export default SideDrawer;

