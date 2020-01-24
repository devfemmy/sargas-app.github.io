import React, { Component } from 'react';
import { InputGroup, Button, InputGroupAddon, 
    InputGroupText, Input} from 'reactstrap';
import masterIcon from '../assets/mastercard.svg';
import trackImg from '../assets/track.png'
import moneyIcon from '../assets/money.svg';
import '../Order/PaymentPage/paymentPage.css';
import axios from 'axios';
import Spinners from '../UI/Spinner/spinner';
import timer from '../assets/timer_icon.svg';
import errorHandler from '../ErrorHandler/errorHandler';
class ConfirmOrder extends Component {
    state = { 
        oldPrice: null,
        price: null,
        payment_method: [],
        loader: false,
        payment_id: null,
        error: false
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
        }).catch(  error => {
                   
            this.setState({error: true, loader: true})});
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
        ).catch(  error => {
                   
            this.setState({error: true, loader: true})});
    }
    confirmOrder = (data, data2, state) => {
        if (this.state.payment_id=== null) {
            alert('please add payment method');
        } else {
            const dayOfDelivery = state.date;
            const timeOfDelivery = state.time;
            const scheduled_time = `${dayOfDelivery} ${timeOfDelivery}`
            console.log(scheduled_time)
    
       
           if (this.state.payment_id === '4') {
            const payment_id = '4';
            this.props.history.push({
                pathname: 'paystack',
                search: '?query=paystack',
                state: {data: data, data2: data2, payment_id: payment_id}
              })
           }else if (this.state.payment_id === '1') {
            const data = {
                token : localStorage.getItem('token'),
                pm_id: this.state.payment_id,
                trans_ref_id: "A29o33",
                price: this.state.oldPrice,
                scheduled_time: '',
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
            }).catch(  error => {
                   
                this.setState({error: true, loader: true})});
        }
        }
      

        // const payment_id = '1';
    
       

    }
    confirmReschedule = (data, data2, data3) => {
        if (this.state.payment_id=== null) {
            alert('please add payment method');
        } else {
            this.props.history.push({
                pathname: 'refil',
                search: '?query=refil',
                state: {data: data, data2: data2, data3: data3}
              })
        }
  
    }
    payWithCard = (data, data2) => {
        // const payment_id = '4';
        // this.props.history.push({
        //     pathname: 'paystack',
        //     search: '?query=paystack',
        //     state: {data: data, data2: data2, payment_id: payment_id}
        //   })
        document.querySelector("#material1").style.display = 'block';
        document.querySelector("#material2").style.display = 'none';
        const block =  document.querySelector("#material1").style.display
        if (block === 'block') {
            this.setState({payment_id: '4'});
        }else {
            this.setState({payment_id: null});
        }
    
    }
    payWithCash = () => {
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
        let renderData = <Spinners />;
        if (this.state.loader) {
            renderData = (
                this.state.payment_method.map(
                    (pm, index) => {
                        if (pm.pm_id === "4") {
                            return (
                                <div className= "confirm_order_div" key = {index}>
                                <InputGroup className= "first-input">
                                    <InputGroupAddon addonType="prepend">
                                    <InputGroupText>
                                        <img className= "master-img" src = {masterIcon} alt= "master-icon" />
                                    </InputGroupText>
                                    </InputGroupAddon>
                                    <Input readOnly onClick= {() => this.payWithCard()} type="text" name="number"  defaultValue= "Card Payment" id="cash" />
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
                                    <Input readOnly onClick= {this.payWithCash} type="text" defaultValue = {pm.payment} id="exampleSelect" />
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
        <div style={{backgroundColor: 'white'}}>
            <div className= "payment">
                <div className= "payment-header2">
                    <div className = "header-wrapper">
                            <p onClick={this.backToPrevPageHandler} className= "payment-text">&larr; 
                            </p>
                         <h5 className= "payment-text2">Confirm Order</h5>   
                    </div>
              
                </div> 
                <div className= "payment-body">
                        <div className= "counter3">
                        <img src={trackImg} className="Track-Img" alt="img" />   
                        </div>
                        {/* <FormGroup>
                            <Label for="exampleText">Text Area</Label>
                            <Input className= "profile-input" type="textarea" name="text" id="exampleText" />
                        </FormGroup> */}
                       <hr />
                    <p className= "current-price">Your Current Order Price is : <span style= {{fontSize: '17px'}} className= "state-price">{this.state.price}</span> </p>
                    <p className= "body-paragragh">Select Payment Method</p>
                   
                    {renderData}

                </div>
        
            </div>
                    <div className= "card-buttons">
                    <Button 
                            outline color="secondary" 
                            className = "card-button" 
                            onClick= {()=> this.confirmOrder(this.state.oldPrice, this.props.location.state, state)} 
                            size="lg">CONFIRM ORDER
                    </Button>
                    <Button 
                            outline color="secondary" 
                            className = "card-button2" 
                            onClick= {()=> this.confirmReschedule(this.state.oldPrice, this.props.location.state, this.state.payment_id)} 
                            size="lg">
                                <img src={timer} className= "timer-img" alt= "timer" />
                    </Button>
                    
            </div>
        </div>
        );
    }
}
 
export default errorHandler(ConfirmOrder, axios);