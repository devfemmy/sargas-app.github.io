import React, { Component } from 'react';
import './paymentPage.css';
import masterIcon from '../../assets/mastercard.svg';
import moneyIcon from '../../assets/money.svg';
// import clearIcon from '../../assets/clear.svg';
import { InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap';

class PaymentPage extends Component {
    state = {

      }

    goToCardPage = () => {
        this.props.history.push({
            pathname: '/payment_method'
          })
    }
    addClass = () => {
        document.querySelector("#material1").style.display = 'block';
        document.querySelector("#material2").style.display = 'none';
    
    }
    addToggle = () => {
        document.querySelector("#material2").style.display = 'block';
        document.querySelector("#material1").style.display = 'none';
    }
    render() { 
        return ( 
            <div className= "payment">
                <div className= "payment-header">
                    <div className = "header-wrapper">
                            <p className= "para-header">&larr; &nbsp; &nbsp; &nbsp; &nbsp;
                            Payment Options</p>
                            <p className= "header-text">Add A Payment Method</p>
                    </div>
              
                </div> 
                <div className= "payment-body">
                    <p className= "body-paragragh">Select Payment Method</p>
                    <InputGroup className= "first-input">
                        <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                            <img className= "master-img" src = {masterIcon} alt= "master-icon" />
                        </InputGroupText>
                        </InputGroupAddon>
                        <Input onClick= {this.addClass} type="text" name="number"  defaultValue= "**** **** 3456" id="exampleSelect" />
                        <InputGroupAddon addonType="append">
                        <InputGroupText>
                        <i id= "material1" style= {{color: 'blue', display: 'none'}} className="material-icons">done</i>
                        </InputGroupText>
                        </InputGroupAddon>
                    </InputGroup>
                    <InputGroup>
                        <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                            <img className= "master-img2" src = {moneyIcon} alt= "master-icon" />
                        </InputGroupText>
                        </InputGroupAddon>
                        <Input onClick= {this.addToggle} type="text" defaultValue = "Cash" id="exampleSelect" />
                        <InputGroupAddon addonType="append">
                        <InputGroupText>
                        <i id= "material2" style= {{color: 'blue'}} className="material-icons">done</i>
                        </InputGroupText>
                        </InputGroupAddon>
                    </InputGroup>
                    <p onClick={this.goToCardPage} className= "body-paragragh2">Add Payment Method</p>

       
                </div>
            </div>
         );
    }
}
 
export default PaymentPage;