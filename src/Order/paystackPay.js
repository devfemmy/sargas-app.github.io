import React, { Component } from 'react';
import PaystackButton from 'react-paystack';
// import { Button } from 'reactstrap';
import axios from 'axios';
import backIcon from '../assets/back.svg';

class PayStackPay extends Component {
    state = { 
        key: "pk_test_57b61000cc76d4336b5c5541e8442c8ee518e263", //PAYSTACK PUBLIC KEY
        email: this.props.location.state.data2.home_details.email,  // customer email
        amount: `${this.props.location.state.data}00` //equals NGN100,
     }
     backToPrevPageHandler = () => {
        this.props.history.goBack();
    }
    callback = (response) => {
        console.log(response); // card charged successfully, get reference here
        console.log(response.status)
        const dayOfDelivery = this.props.location.state.data2.date;
        const timeOfDelivery = this.props.location.state.data2.date;
        const scheduled_time = `${dayOfDelivery} ${timeOfDelivery}`;
        const payment_id = this.props.location.state.payment_id;
        const price = this.props.location.state.data;
        const data = {
            token : localStorage.getItem('token'),
            pm_id: payment_id,
            trans_ref_id: "A29o33",
            price: price,
            scheduled_time: scheduled_time,
            scheduled_status: "0",
            promo_code: "",
            cylinder_size: localStorage.getItem('cylinder_size')
        }
        if (response.status === 'success') {
            axios.post('https://sargasoms.com/api/customer/?API_flag=order', data)
            .then(res => {
                const response = res.data;
                if (response.status === 1001) {
                    this.props.history.push({
                        pathname: '/success'
                      })
                }else {
                    this.props.history.push(
                        {
                            pathname: '/failed'
                        }
                    )
                }
                console.log(res)
            }).catch(
                err => {
                    console.log(err)
                }
            )
        }

    }

    close = () => {
        console.log("Payment closed");
    }
    getReference = () => {
        //you can put any unique reference implementation code here
        let text = "";
        let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-.=";

        for( let i=0; i < 15; i++ )
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    }
    render() { 
        const state = this.props.location.state;
        console.log(state)
        return ( 
            <div className = "add-card">
               <div id= "sticky_element" className= "payment-header2">
               <p style={{width: '500px',paddingTop: '5%', color: 'white', fontSize: '15px'}}>
                    <img onClick={this.backToPrevPageHandler} src={backIcon} style={{float: 'left'}} alt= "float" />
                   &nbsp; &nbsp; PayStackPay
                </p> 
                   
            </div> 
            <div style= {{marginTop: '20px'}}>
            <PaystackButton
                text="Make Payment"
                class="payButton"
                callback={this.callback}
                close={this.close}
                disabled={true} 
                embed={true} 
                reference={this.getReference()}
                email={this.state.email}
                amount={parseInt(this.state.amount)}
                paystackkey={this.state.key}
                tag="button"
              />
            </div>
 
            <div style= {{textAlign: 'center'}}>
           <p>Card Number: 408 408 408 408 408 1</p> 
            <p>Expiry Date: any date in the future</p>
            <p>CVV: 408</p>
            </div>
          <div className= "card-buttons">
          {/* <Button 
                  outline color="secondary" 
                  className = "card-button" 
                  onClick= {this.submitCard} 
                  size="lg">CONFIRM ORDER
          </Button> */}
          </div>
      </div>
         );
    }
}
 
export default PayStackPay;