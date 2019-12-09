import React, { Component } from 'react';
import {Button} from 'reactstrap'
import './orderSuccess.css';
import orderCheck from '../../assets/check_box.svg';

class OrderSuccess extends Component {
    state = {  }
    pushToNextPage = () => {
        this.props.history.push({
          pathname: '/failed'
        })
      
      }
    pushToTrackingPage = () => {
        this.props.history.push({
          pathname: '/tracking'
        })
      
      }
    render() { 
        return ( 
            <div className= "order-success">
                <div className= "order-header">
                  <p className= "para-header">&larr; Sargas to Old Yaba Road</p>
                </div>  
               
                <div className= "transaction-success">
                <img src={orderCheck} className="order_img" alt="logo" />   
                    <h3>Transfer Successful</h3>
                </div>
                <br />
                <hr className= "horizontal-line" />
                    <h5>Sargas Energy</h5>
                    <p>Users Address</p>
                <div className = "section3">
                <Button style= {{color: "green"}} 
                outline 
                onClick= {this.pushToTrackingPage}
                color="secondary"
                 className = "Order-btn"  
                 size="lg">Track Order Now</Button>
                 <br />
                 <Button style= {{color: "white"}} 

                 outline color="secondary"
                 onClick= {this.pushToNextPage}
                  className = "Track-btn"  
                  size="lg">START A NEW REFILL</Button>
                </div>
            </div>
         );
    }
}
 
export default OrderSuccess;