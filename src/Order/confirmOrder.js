import React, { Component } from 'react';
import { InputGroup, Button, InputGroupAddon, InputGroupText, Input } from 'reactstrap';
import masterIcon from '../assets/mastercard.svg';
import moneyIcon from '../assets/money.svg';
import '../Order/PaymentPage/paymentPage.css';
import axios from 'axios';
import Spinner from '../UI/Spinner/spinner';
class ConfirmOrder extends Component {
    state = { 
        oldPrice: null,
        price: null,
        payment_method: [],
        loader: false,
        payment_id: null
     }
     backToPrevPageHandler = () => {
        this.props.history.goBack();
    }
    componentDidMount () {
        const data2 = {
            token : localStorage.getItem('token'),
        }
        axios.post('http://sargasoms.com/api/customer/?API_flag=paymentmethod', data2 )
        .then(res => {
            const response = res.data;
            if (response.status === 1001) {
                const data = response.data;
                this.setState({payment_method: data, loader: true})
            }
        }).catch(err => {
            console.log(err)
        })
        const data = {
            token : localStorage.getItem('token'),
            size: 3,
            city_id: localStorage.getItem('city_id')
        }
        axios.post('http://sargasoms.com/api/customer/?API_flag=getprice', data )
        .then(
            res => {
                const response = res.data;
                if (response.status === 1001) {
                    const price = response.price;
                    const realprice = `₦${price}`;
                    this.setState({price: realprice, oldPrice: price})
                }
                console.log(res);
            }
        ).catch(
            err => {
                console.log(err)
            }
        )
    }
    confirmOrder = (state) => {
       
        const dayOfDelivery = state.date;
        const timeOfDelivery = state.time;
        const scheduled_time = `${dayOfDelivery} ${timeOfDelivery}`
        // console.log(scheduled_time)
        if (this.state.payment_id=== null) {
            alert('please add payment method');
        }else {
            const data = {
                token : localStorage.getItem('token'),
                pm_id: this.state.payment_id,
                trans_ref_id: "A29o33",
                price: this.state.oldPrice,
                scheduled_time: scheduled_time,
                scheduled_status: "0",
                promo_code: "",
                cylinder_size: localStorage.getItem('cylinder_size')
            }
            this.setState({loader: false})
            axios.post('http://sargasoms.com/api/customer/?API_flag=order', data)
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
    addClass = (data, data2) => {
        const payment_id = '4';
        this.props.history.push({
            pathname: 'paystack',
            search: '?query=paystack',
            state: {data: data, data2: data2, payment_id: payment_id}
          })
        document.querySelector("#material1").style.display = 'block';
        document.querySelector("#material2").style.display = 'none';
        const block =  document.querySelector("#material1").style.display
        if (block === 'block') {
            this.setState({payment_id: '4'});
        }else {
            this.setState({payment_id: null});
        }
    
    }
    addToggle = () => {
        document.querySelector("#material2").style.display = 'block';
        document.querySelector("#material1").style.display = 'none';

        const block =  document.querySelector("#material2").style.display
        if (block === 'block') {
            this.setState({payment_id: '1'});
        }else {
            this.setState({payment_id: null});
        }
    }
    render() { 
        const state = this.props.location.state;
        console.log(state)
        let renderData = <Spinner />;
        if (this.state.loader) {
            renderData = (
                this.state.payment_method.map(
                    (pm, index) => {
                        if (pm.pm_id === "4") {
                            return (
                                <div key = {index}>
                                <InputGroup className= "first-input">
                                    <InputGroupAddon addonType="prepend">
                                    <InputGroupText>
                                        <img className= "master-img" src = {masterIcon} alt= "master-icon" />
                                    </InputGroupText>
                                    </InputGroupAddon>
                                    <Input onClick= {() => this.addClass(this.state.oldPrice, this.props.location.state)} type="text" name="number"  defaultValue= "**** **** ****" id="cash" />
                                    <InputGroupAddon addonType="append">
                                    <InputGroupText>
                                    <i id= "material1" style= {{color: 'blue', display: 'none'}} className="material-icons">done</i>
                                    </InputGroupText>
                                    </InputGroupAddon>
                                </InputGroup>
                                </div>
                            )
                        }else if(pm.pm_id === "1") {
                            return (
                                <div  key = {index}>
                                <InputGroup>
                                    <InputGroupAddon addonType="prepend">
                                    <InputGroupText>
                                        <img className= "master-img2" src = {moneyIcon} alt= "master-icon" />
                                    </InputGroupText>
                                    </InputGroupAddon>
                                    <Input onClick= {this.addToggle} type="text" defaultValue = {pm.payment} id="exampleSelect" />
                                    <InputGroupAddon addonType="append">
                                    <InputGroupText>
                                    <i id= "material2" style= {{color: 'blue', display: 'none'}} className="material-icons">done</i>
                                    </InputGroupText>
                                    </InputGroupAddon>
                                </InputGroup>
                                </div>
                            )
                        }
                        else {
                            return null
                        }
                    }
                )
            )
        }
        return (  
            <div className= "payment">
                <div className= "payment-header2">
                    <div className = "header-wrapper">
                            <p onClick={this.backToPrevPageHandler} className= "payment-text">&larr; 
                            </p>
                         <h5 className= "payment-text2">Confirm Order</h5>   
                    </div>
              
                </div> 
                <div className= "payment-body">
                    <p className= "current-price">Your Current Order Price is : <span className= "state-price">{this.state.price}</span> </p>
                    <p className= "body-paragragh">Select Payment Method</p>
                   
                    {renderData}

                </div>
                <div className= "card-buttons">
                <Button 
                        outline color="secondary" 
                        className = "card-button" 
                        onClick= {()=> this.confirmOrder(state)} 
                        size="lg">CONFIRM ORDER
                </Button>
                </div>
            </div>
        );
    }
}
 
export default ConfirmOrder;