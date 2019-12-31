import React, { Component } from 'react';
import {Button} from 'reactstrap';
import '../OrderSuccessful/orderSuccess.css';
import './orderFailed.css';
import orderFailedIcon from '../../assets/delete-button.svg';

class OrderFailed extends Component {
    state = {  }
    backToPrevPageHandler = () => {
        this.props.history.goBack();
    }
    pushToNextPage = () => {
        this.props.history.push({
          pathname: '/profile'
        })
      
      }
    render() { 
        const customer_address = localStorage.getItem('customer_address');
        return (  
            <div>
                <div className= "order-header">
            <p className= "para-header">&larr; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Sargas to {customer_address}</p>
                </div>  
                <div className= "order-failed">
                <img src={orderFailedIcon} className="order_img" alt="logo" />
                <h3>Transaction Unsuccessful</h3>
                </div>
               
                <div className= "section4">
                <Button style= {{color: "white"}} 
                onClick= {this.pushToNextPage}
                outline color="secondary"
                 className = "Track-btn"  
                 size="lg">RETRY</Button>
                </div>
            </div>
        );
    }
}
 
export default OrderFailed;