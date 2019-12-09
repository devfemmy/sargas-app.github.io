import React, { Component } from 'react';
import {Button} from 'reactstrap';
import '../OrderSuccessful/orderSuccess.css';
import './orderFailed.css';

class OrderFailed extends Component {
    state = {  }
    render() { 
        return (  
            <div>
                <div className= "order-header">
                <p className= "para-header">&larr; Sargas to Old Yaba Road</p>
                </div>  
                <div className= "order-failed">
                </div>
                <h3>Transaction Unsuccessful</h3>
                <div className= "section4">
                <Button style= {{color: "white"}} 
                outline color="secondary"
                 className = "Track-btn"  
                 size="lg">RETRY</Button>
                </div>
            </div>
        );
    }
}
 
export default OrderFailed;