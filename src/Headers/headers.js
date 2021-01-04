import React, { Component } from 'react';
import './headers.css';
import menu from '../assets/menu.svg';
import SideDrawer from '../UI/SideDrawer/sideDrawer';

class Headers extends Component{
 state = {
   showSideDrawer: false
 }
 sideDrawerHandler = () => {
  this.setState({showSideDrawer: false})
}

sideDrawerToggleHandler = () => {
  this.setState((prevState) => {
  return {showSideDrawer: !prevState.showSideDrawer};
     });
}
  render () {
    return (
      <div id= "sticky_header" className= "menu-div">
        <SideDrawer
            props= {this.props}
           open = {this.state.showSideDrawer}
           closed = {this.sideDrawerToggleHandler}
        />
        <img onClick= {this.sideDrawerToggleHandler} className= "menulogo" src={menu} alt = "home-icon" />
        <h5>{this.props.name}</h5>
      </div>
  )
  }

}

export default Headers;