import React, { Component } from 'react';
import './homePage.css';
import trackImg from '../assets/track.png'
import SideDrawer from '../UI/SideDrawer/sideDrawer';
import menu from '../assets/menu.svg';
import {Button} from 'reactstrap'

class HomePage extends Component {
    state = { 
        showSideDrawer : false,
     }
     sideDrawerHandler = () => {
        this.setState({showSideDrawer: false})
     }
     componentDidMount() {
        const home_details = this.props.location.state.home_details;
        if (home_details.apartment === '' && home_details.firstname === '') {
        
            this.props.history.push({
                pathname: 'profile'
            })
        }
     }
     pushToNextPage = (home_details) => {
        // const address = home_details.apartment;
        // const street = home_details.street;
        // const state = home_details.state;
        const customer_address = localStorage.getItem('customer_address');
        if (customer_address === null) {
            alert('Please go to profile to fill in your address')
        }else {
            this.props.history.push({
                pathname: 'refil',
                search: '?query=refil',
                state: {home_details: home_details}
              })
        }
     }

     sideDrawerToggleHandler = () => {
        this.setState((prevState) => {
        return {showSideDrawer: !prevState.showSideDrawer};
           });
     }
    render() { 
        const home_details = this.props.location.state.home_details
        const firstname = home_details.firstname;
        const apartment = home_details.apartment;
        localStorage.setItem('apartment', apartment)
        const street = home_details.street;
        localStorage.setItem('street', street)

        const name = firstname.toUpperCase()
        // const first = firstname.capitalize()
        console.log(home_details)
        return ( 
        <div>
               <SideDrawer 
                open = {this.state.showSideDrawer}
                closed = {this.sideDrawerToggleHandler}
                />
            <div className = "home">
            <img  src={menu} onClick= {this.sideDrawerToggleHandler} className="menu" alt="logo" />
                <div className= "counter2">
                <img src={trackImg} className="Track-Img" alt="img" />   
                </div>
                <div className = "home-content">
                <h2>Hi, {name}</h2>
                </div>
            </div>
              <div className= "button-div">
                <Button 
                        outline color="secondary" 
                        className = "home-button" 
                        onClick= {()=> this.pushToNextPage(home_details)} 
                        size="lg">ORDER REFILL
                </Button>
              </div>

        </div>
            
         );
    }
}
 
export default HomePage;