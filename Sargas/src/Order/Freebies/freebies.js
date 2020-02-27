import React, { Component } from 'react';
import '../OrderHistory/history.css';
import './freebies.css';
import backIcon from '../../assets/back.svg';

class Freebies extends Component {
    state = {  }
    backToPrevPageHandler = () => {
        this.props.history.goBack();
    }
    render() { 
        return ( 
            <div style={{backgroundColor: 'white'}}>
                <div id= "sticky_element" className= "payment-header2">
               <p style={{width: '500px',paddingTop: '5%', color: 'white', fontSize: '15px'}}>
                    <img onClick={this.backToPrevPageHandler} src={backIcon} style={{float: 'left'}} alt= "float" />
                   &nbsp; &nbsp; Freebies
                </p> 
                   
                </div> 
                <div className = "freebies-text">
                <h5>Freebies are Unavailable</h5>
                </div>
              
            </div>
         );
    }
}
 
export default Freebies;