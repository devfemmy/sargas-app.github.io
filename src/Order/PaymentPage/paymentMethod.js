import React, { Component } from 'react';
import './paymentPage.css';
import cardIcon from '../../assets/credit_card.svg';
// import clearIcon from '../../assets/clear.svg';
import { InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap';

class PaymentMethod extends Component {
    state = {  }
    goToCardPage = () => {
        this.props.history.push({
            pathname: '/card'
          })
    }
    render() { 
        return ( 
            <div className= "payment-method">
                <div className= "payment-header2">
                    <div className = "header-wrapper">
                            <p className= "payment-text">&larr; 
                            </p>
                         <h5 className= "payment-text2">Add Payment Method</h5>   
                    </div>
                   
                  
                </div> 
                <div className= "payment-method2">
                    <InputGroup>
                        <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                            <img className= "master-img3" src = {cardIcon} alt= "card-icon" />
                        </InputGroupText>
                        </InputGroupAddon>
                        <Input onClick= {this.goToCardPage} type="text" defaultValue = "Credit or Debit Card" id="credit_card" />
                    </InputGroup>
                </div>
            </div>
         );
    }
}
 
export default PaymentMethod;