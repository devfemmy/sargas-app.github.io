import React, { Component } from 'react';
import './homePage.css';
import trackImg from '../assets/track.png'
import SideDrawer from '../UI/SideDrawer/sideDrawer';
import menu from '../assets/menu.svg';
import {Button, Row, Col} from 'reactstrap'
import axios from 'axios';
import errorHandler from '../ErrorHandler/errorHandler';
import Timer from 'react-compound-timer'
// import Spinners from '../UI/Spinner/spinner';

class HomePage extends Component {
    state = { 
        showSideDrawer : false,
        loader: false,
        home_details: [],
        error: false,
        showButton: false,
        time: 0,
        enableButton: false,
        order_status: null
     }
     sideDrawerHandler = () => {
        this.setState({showSideDrawer: false})
     }
     componentDidMount() {
        // const home_details = this.props.location.state.home_details;
        const data = {
            token: localStorage.getItem('token')
        }
        axios.post('http://sargasoms.com/api/customer/?API_flag=fetchcustomertransactions', data)
        .then(res => {
            console.log("orders", res)
            const response = res.data;
                 if (response.status === 1001) {
                const orders = response.data;
                const reversedOrder = orders.reverse();
                const firstOrder = reversedOrder[0].order_id;
                localStorage.setItem('order_id', firstOrder);
                const data2 = {
                    token: localStorage.getItem('token'),
                    order_id: firstOrder
                }
                axios.post('http://sargasoms.com/api/customer/?API_flag=getordertime', data2)
                .then(res => {
                    console.log ("fetchtime", res)
                    if (res.data.status === 1001) {
                        const status = Number(res.data.order_status)
                        if (status >= 4) {
                            this.setState({showButton: false, enableButton: true})
                        }else {
                        const time = res.data.time;
                        this.setState({time: time, showButton: true, order_status: 'Dispatched'})
                        }
                        
                    } else {
                        this.setState({enableButton: true})
                    }
                   
                }).catch(  error => {
                           
                this.setState({error: true, loader: true})});
               
            } else {
                this.setState({enableButton: true})
            }
        })

        axios.post('http://sargasoms.com/api/customer/?API_flag=fetchcusprofile', data)
        .then(res => {
            console.log(res.data)
            const home_details = res.data
            // const home_details = response.home_details;
            // const usersfirstname = home_details.firstname;
            // const userslastname = home_details.lastname;
            // console.log(usersfirstname)
            // localStorage.setItem('usersfirstname', usersfirstname);
            // localStorage.setItem('userslastname', userslastname);
            if (home_details.apartment === '' && home_details.firstname === '') {
        
                this.props.history.push({
                    pathname: 'profile'
                })
            }
            this.setState({home_details: home_details, loader: true});
        }).catch(  error => {
                   
            this.setState({error: true, loader: true})});
      
     }
     pushToNextPage = (home_details) => {
        // const address = home_details.apartment;
        // const street = home_details.street;
        // const state = home_details.state;
        // const customer_address = localStorage.getItem('customer_address');
            if (home_details === null) {
                
            }else {
                this.props.history.push({
                    pathname: 'pricing',
                    search: '?query=pricing',
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
        const home_details = this.state.home_details
        const firstname = localStorage.getItem('usersfirstname');
        const lastname = home_details.lastname;
        localStorage.setItem('lastname', lastname)
        localStorage.setItem('firstname', firstname)
        // const name = firstname.toUpperCase()
        const apartment = home_details.apartment;
        localStorage.setItem('apartment', apartment)
        const street = home_details.street;
        const b_stop = home_details.street2;
        const city = home_details.city;
        const state = home_details.state;
        localStorage.setItem('street', street);
        localStorage.setItem('bstop', b_stop);
        localStorage.setItem('city', city)
        localStorage.setItem('state', state)
        let order_id = localStorage.getItem('order_id');
        let apartment2 = this.state.home_details.apartment;
        let street2 = this.state.home_details.street;
        console.log(apartment2, street2)

        const customer_address = `${apartment2} ${street2}`
        const slice_custom_add = customer_address.slice(0, 12)
        let displayButton = (
            <div className= "button-div">
            <Button 
                    disabled = {!this.state.enableButton}
                    outline color="secondary" 
                    className = "home-button" 
                    onClick= {()=> this.pushToNextPage(home_details)} 
                    size="lg">ORDER REFILL
            </Button>
            </div>
        )
        if (this.state.showButton) {
            let hms = this.state.time; 
            let a = hms.split(':');
            const seconds = (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]); 
            const milliseconds = seconds * 1000;
            displayButton = (
                <div className= "timer-div">
                    <div className= "even-div">
                        <Row>
                            <Col xs= "7">
                            <p>ORDER ARRIVES IN:</p>
                            </Col>
                            <Timer
                    initialTime={milliseconds}
                    direction="backward">
                        <Col xs= "5">
                            <p className="animated infinite pulse delay-6s" style={{fontWeight: 'bolder', color: 'white', fontSize: '11px'}}>
                            <Timer.Hours />hr: <Timer.Minutes />mn: <Timer.Seconds />
                            </p>
                        </Col>     
                    </Timer>
 
                        </Row>
                    </div>
                    <div className= "odd-div">
                        <Row>
                            <Col xs= "7">
                            <p>ORDER STATUS:</p>
                            </Col>
                            <Col xs= "5">
                            <p>{this.state.order_status}</p>
                            </Col>
                        </Row>
                    </div>
                    <div className= "even-div">
                        <Row>
                            <Col xs= "7">
                            <p>ORDER ID:</p>
                            </Col>
                            <Col xs= "5">
                            <p>{order_id}</p>
                            </Col>
                        </Row>
                    </div>
                    <div className= "odd-div">
                        <Row>
                            <Col xs= "7">
                            <p>ADDRESS:</p>
                            </Col>
                            <Col xs= "5">
                            <p>{slice_custom_add}</p>
                            </Col>
                        </Row>
                    </div>
                    <div className= "even-div">
                        <Row>
                            <Col xs= "7">
                            <p>DISPATCHER:</p>
                            </Col>
                            <Col xs= "5">
                            <p>-</p>
                            </Col>
                        </Row>
                    </div>
                    <div className= "odd-div">
                        <Row>
                            <Col xs= "7">
                            <p>DISPATCHER'S N0:</p>
                            </Col>
                            <Col xs= "5">
                            <p  type="tel" name="phone">-</p>
                            </Col>
                        </Row>
                    </div>

                {/* <Button 
                        outline color="secondary" 
                        className = "home-button" 
                        onClick= {()=> this.pushToNextPage(home_details)} 
                        size="lg">ORDER REFILL
                </Button> */}
                </div>
            )
        }
  
        // let showName = <Spinners />
        // if (this.state.loader) {
        //     showName = (
            
        //     )
        // }


        return ( 
        <div>
               <SideDrawer 
                open = {this.state.showSideDrawer}
                closed = {this.sideDrawerToggleHandler}
                props = {this.props}
                />
            <div className = "home">
            <img  src={menu} onClick= {this.sideDrawerToggleHandler} className="menu" alt="logo" />
                <div className= "counter2">
                <img src={trackImg} className="Track-Img" alt="img" />   
                </div>
                <div className = "home-content">
                <h2>Hi, {firstname.toUpperCase()}</h2>
                </div>
                {displayButton}
            </div>


        </div>
            
         );
    }
}
 
export default errorHandler (HomePage, axios);