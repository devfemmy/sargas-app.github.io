import React, { Component } from 'react';
import {Button} from 'reactstrap';
import '../OrderSuccessful/orderSuccess.css';
import './orderFailed.css';

class OrderFailed extends Component {
    state = {  }
    pushToNextPage = () => {
        this.props.history.push({
          pathname: '/profile'
        })
      
      }
    render() { 
        return (  
            <div>
                <div className= "order-header">
                <p className= "para-header">&larr; Sargas to Old Yaba Road</p>
                </div>  
                <div className= "order-failed">
                <i className="material-icons">highlight_off</i>
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