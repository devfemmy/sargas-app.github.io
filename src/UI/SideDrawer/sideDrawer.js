import React, {Component} from 'react';
import './sideDrawer.css';
// import '../../login/login.css';
import Backdrop from '../Backdrop/backdrop';
import {Card,CardBody } from 'reactstrap';
// import logOut from '../../assets/logout.svg';
// import NavigationItems from '../Navigations/NavigationItems/navigationItems';

class SideDrawer extends Component {
    state = {  }
    
    render() { 
        let attachedClasses = ["SideDrawer", "Close" ];
        if (this.props.open) {
            attachedClasses =  ["SideDrawer", "Open" ];
        }
        return (
            <div>
                <Backdrop show = {this.props.open} clicked = {this.props.closed}/>
                
                <div className = {attachedClasses.join(' ')}>
                
                    <div className= "universal-pad2">
                   
                 
                    </div>
                    <hr className= "horizontal-line" />
                    <div className= "universal-pad2">
              
                    </div>
                </div>
                
            </div>
    
    
        );
    }
}
 
export default SideDrawer;

