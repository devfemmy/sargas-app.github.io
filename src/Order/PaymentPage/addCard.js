import React, { Component } from 'react';
import './paymentPage.css';
import { InputGroup, Button, Row, Col, 
    InputGroupAddon, InputGroupText, Input, Label } from 'reactstrap';
import cardIcon from '../../assets/credit_card.svg';
import axios from 'axios';

class AddCard extends Component {
    state = {  }
    submitCard = () => {
       const month = document.querySelector('#month_year').value;
       month.split()
       const x = month[0]
       const y = month[1]
       const MM = x + y;
       const a = month[3]
       const b = month[4]
       const YY = a + b;
       const data = {
        token : localStorage.getItem('token'),
        mm: MM,
        yy: YY,
        payment_method_id: '4',
        cardno: document.querySelector('#credit_card').value,
        name: document.querySelector('#acct_name').value,
        cvv: document.querySelector('#cvv').value


    }
    axios.post('https://sargasoms.com/api/customer/?API_flag=addcard', data )
    .then(res => {
        console.log(res)
    }).catch(
        err => {
            console.log(err)
        }
    )
    
    }
    backToPrevPageHandler = () => {
        this.props.history.goBack();
    }
    render() { 
        return (  
            <div className = "add-card">
                  <div className= "payment-header2">
                    <div className = "header-wrapper">
                            <p onClick= {this.backToPrevPageHandler} className= "payment-text">&larr; 
                            </p>
                         <h5 className= "payment-text2">Add Card</h5>   
                    </div>
              
                </div> 
                <div className= "card-input-session">
                <Label className= "card-labels" for="exampleEmail">Card Number</Label>
                    <InputGroup>
                            <InputGroupAddon className = "prepend-card" addonType="prepend">
                            <InputGroupText className = "prepend-card">
                                
                                <img className= "master-img3" src = {cardIcon} alt= "card-icon" />
                            </InputGroupText>
                            </InputGroupAddon>
                            <Input type="number" id="credit_card" />
                    </InputGroup>
                    <br />
                    <InputGroup>
                            <Input type="text" id="acct_name" placeholder ="Account Name" />
                    </InputGroup>
                    <br />
                    <Row>
                        <Col>
                            <InputGroup>
                                <Input maxLength= "5" type="text" id="month_year" placeholder ="MM/YY" />
                            </InputGroup>
                        </Col>
                        <Col>
                            <InputGroup>
                                    <Input type="number" id="cvv" placeholder ="CVV" />
                                </InputGroup>
                        </Col>
                        
                    </Row>
               
                </div>
                <div className= "card-buttons">
                <Button 
                        outline color="secondary" 
                        className = "card-button" 
                        onClick= {this.submitCard} 
                        size="lg">NEXT
                </Button>
                </div>
            </div>
        );
    }
}
 
export default AddCard;