import React, { Component } from 'react';
import {Button, Row, Col} from 'reactstrap'
import './orderSuccess.css';
import orderCheck from '../../assets/success.svg';
// import { MdCheckCircle } from 'react-icons/md';

class OrderSuccess extends Component {
    state = {  }
    backToPrevPageHandler = () => {
      this.props.history.goBack();
  }
    pushToNextPage = () => {
        this.props.history.push({
          pathname: '/home'
        })
      
      }
    pushToTrackingPage = () => {
        this.props.history.push({
          pathname: '/tracking'
        })
      
      }
    render() { 
      const apartment = localStorage.getItem('apartment');
      const street = localStorage.getItem('street')
      const bstop = localStorage.getItem('bstop')
      const firstname = localStorage.getItem('usersfirstname');
      const lastname = localStorage.getItem('userslastname');
      const usersName = `${firstname} ${lastname}`
        return ( 
            <div style={{backgroundColor: 'white'}} className= "order-success">
                <div className= "order-header">
        <p className= "para-header"><span onClick= {this.backToPrevPageHandler}>&larr; </span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Sargas to  {apartment} {street}</p>
                </div>  
               
                <div className= "transaction-success">
                <div className= "icon-img">
                  {/* <MdCheckCircle /> */}
                  {/* <i class="material-icons">check_circle_outline</i> */}
                <img src={orderCheck} className="order_img" alt="logo" />
                </div>
                {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M170.718 216.482L141.6 245.6l93.6 93.6 208-208-29.118-29.118L235.2 279.918l-64.482-63.436zM422.4 256c0 91.518-74.883 166.4-166.4 166.4S89.6 347.518 89.6 256 164.482 89.6 256 89.6c15.6 0 31.2 2.082 45.764 6.241L334 63.6C310.082 53.2 284.082 48 256 48 141.6 48 48 141.6 48 256s93.6 208 208 208 208-93.6 208-208h-41.6z"/></svg> */}
                    <h3>Transaction Successful</h3>
                </div>
                <br />
                <hr />
               <div className= "order-wrapper">
                  <div className= "wrapper-contents">
                    <Row>
                        <Col xs= "4"></Col>
                        <Col className= "column" xs = "8">
                        <h5>{usersName}</h5>
                        <p>
                          {apartment} {street} {bstop}
                        </p>
                        </Col>

                    </Row>
                     
                  </div>
               </div>
                  
                  <div className= "grade-icons">
                  <i className="material-icons">grade</i>
                  <i className="material-icons">grade</i>
                  <i className="material-icons">grade</i>
                  <i className="material-icons">grade</i>
                  <i style = {{color: "grey"}} className="material-icons">grade</i>
                  </div>
                <div className = "section3">
                 <Button style= {{color: "white"}} 

                 outline color="secondary"
                 onClick= {this.pushToTrackingPage}
                  className = "Track-btn"  
                  size="lg">TRACK ORDER</Button>
                </div>
            </div>
         );
    }
}
 
export default OrderSuccess;