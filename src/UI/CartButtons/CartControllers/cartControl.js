import React from 'react';
import {Row, Col} from 'reactstrap';
// import './BuildControl.css'
import './cartControl.css';
import plusIcon from '../../../assets/plus.svg';
import minusIcon from '../../../assets/minus.svg';

const CartControl = (props) => {
    console.log("properties",props);
    return (
    <div className= "BuildControl">
    <h6 className= "category-name">{props.label}</h6>
    <Row>
        <Col sm= "8" xs= "8" md= "7">{props.label}</Col>
        <Col sm= "1" xs= "1"><span onClick={props.removed} disabled= {props.disabled}><strong><img src={minusIcon} className="" alt="logo" /></strong></span></Col>
    <Col sm= "1" xs= "1">{props.counter}</Col>
        <Col sm= "1" xs= "1"><span onClick={props.added}>
            <strong><img src={plusIcon} className="" alt="logo" /></strong></span></Col>
    </Row>   
    <Row>
    <Col sm= "7" xs= "7">500 <span className= "card-text">points</span></Col>
    <Col sm= "4" xs= "5"><span><strong>ADD TO ORDER</strong></span></Col>
    </Row>  
    <hr className= "horizontal-line" />   
    </div>
)};
  
export default CartControl;