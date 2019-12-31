import React, { Component } from 'react';
import '../OrderSuccessful/orderSuccess.css';
import trackImg from '../../assets/track.png';
import './trackingPage.css';
import Timer from 'react-compound-timer';
import checkIcon from '../../assets/clear.svg';


class TrackingPage extends Component {
    state = {  }
    render() { 
        return (  
            <div className= "">
                <div className= "order-header">
                <p className= "para-header"><span>
                    <img src={checkIcon} className="" alt="logo" />
                    </span>&nbsp;&nbsp;&nbsp;&nbsp;Track Order</p>
                </div> 
                <div className= "counter">
                <img src={trackImg} className="Track-Img" alt="img" />   
                </div>
                <div className= "timer">
                    <h5>ETA</h5>
                    <h2>
                    <Timer
                    initialTime={5500000000}
                    direction="backward">
    
           
                    <Timer.Minutes />:<Timer.Seconds />
           

                    </Timer>
                    </h2>
                    <h5>MINUTES</h5>
                </div>
            </div>
        );
    }
}
 
export default TrackingPage;