import React, { Component } from 'react';
import '../OrderHistory/history.css';
import './freebies.css';

class Freebies extends Component {
    state = {  }
    backToPrevPageHandler = () => {
        this.props.history.goBack();
    }
    render() { 
        return ( 
            <div style={{backgroundColor: 'white'}}>
                <div id = "sticky_elements" className= "payment-header2">
                    <div className = "header-wrapper">
                            <p onClick= {this.backToPrevPageHandler} className= "payment-text">&larr; 
                            </p>
                         <h5 className= "payment-text2">Freebies</h5>   
                    </div>
                   
                </div> 
                <div className = "freebies-text">
                <h5>Freebies are Unavailable</h5>
                </div>
              
            </div>
         );
    }
}
 
export default Freebies;