import React, { Component } from 'react';
// import { Row } from 'reactstrap';
import './history.css';
import axios from 'axios';
import Spinners from '../../UI/Spinner/spinner';
import errorHandler from '../../ErrorHandler/errorHandler';
import backIcon from '../../assets/back.svg';
import { Row } from 'reactstrap';
import { Col } from 'reactstrap';
import UIModal from "../../UI/UIModal/ui-modal";

class History extends Component {
    state = { 
        loader: false,
        loader2: false,
        orders: [],
        noOrder: null,
        error: false,
        receipts: null,
        showRecep: false
     }
    componentDidMount() {
        const data = {
            token: localStorage.getItem('token')
        }
        axios.post('https://sargasoms.com/api/customer/?API_flag=fetchcustomertransactions', data)
        .then(res => {
            console.log('history', res)
            const response = res.data;
                 if (response.status === 1001) {
                const orders = response.data;
                // const reversedOrder = orders.reverse();
                this.setState({orders: orders, loader: true})
                // const firstOrder = reversedOrder[0].order_id;
                // localStorage.setItem('order_id', firstOrder)
               
            }
            if (response.status === 2001) {
                this.setState({loader: true, loader2: true, noOrder: 'No Order History'})
            }
        }).catch(  error => {
                   
            this.setState({error: true, loader: true})});
    }
    backToPrevPageHandler = () => {
        this.props.history.goBack();
    }
    showReceipts = (data) => {
        console.log(data)
        this.setState({receipts: data, showRecep: true});
      
      
    }
    closeReceipts = () => {
        this.setState({showRecep: false})
    };

    render() { 
        const receipts = this.state.receipts
        let showReceipts = null;

        if (this.state.showRecep) {
            const orderId = receipts.order_id;
            const status = receipts.order_status;
            // const date = receipts.date;
            const apt = receipts.apt;
            const street = receipts.street;
            const busstop = receipts.street2;
            const city = receipts.city;
            const customer_address = `${apt} ${street} ${busstop} ${city}`;
            const cylinder_size = receipts.cylinder_size;
            const payment_method = receipts.payment_method;
            const rider = receipts.rider_name;
            const delivery_date = receipts.delivery_date
            showReceipts= (

                <UIModal hideModal={this.closeReceipts} modal={this.state.showRecep}>
                    {/* <h5 style={{textAlign: 'center', marginBottom: '10px'}}>Order Details</h5> */}
                    <Row>
                        <Col xs= "6">
                            <p style={{fontWeight: 'bolder'}}>ID:</p>
                        </Col>
                        <Col  xs= "6">
                            <p>{orderId}</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs= "6">
                            <p style={{fontWeight: 'bolder'}}>Cylinder Size:</p>
                        </Col>
                        <Col  xs= "6">
                            <p>{cylinder_size?cylinder_size:"-"}</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col  xs= "6">
                            <p style={{fontWeight: 'bolder'}}>Status:</p>
                        </Col>
                        <Col  xs= "6">
                            <p>{status?status:"null"}</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs= "6">
                            <p style={{fontWeight: 'bolder'}}>Delivery Date:</p>
                        </Col>
                        <Col xs= "6">
                            <p>{delivery_date?delivery_date:"-"}</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs= "6">
                            <p style={{fontWeight: 'bolder'}}>Rider's Name:</p>
                        </Col>
                        <Col xs= "6">
                            <p>{rider && rider!== " "?rider:"-"}</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs= "6">
                            <p style={{fontWeight: 'bolder'}}>Payment Method:</p>
                        </Col>
                        <Col xs= "6">
                            <p>{payment_method}</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs= "6">
                            <p style={{fontWeight: 'bolder'}}>Address:</p>
                        </Col>
                        <Col xs= "6">
                            <p>{customer_address}</p>
                        </Col>
                    </Row>
                </UIModal>
            )
        }
        let showOrder = <Spinners />
        let showNoOrder = null
        if (this.state.loader2) {
            showNoOrder = (
                <div>
                    <h6 className = "no-order">
                    {this.state.noOrder}
                    </h6>
                   
                </div>
            )
        }
        if(this.state.loader) {
            showOrder = (
                <div>
                {this.state.orders.map(
                    (order, index) => {
                        return (
                            <div onClick={() => this.showReceipts(order)} key = {index}>
                            <h6> 
                                {order.apt} &nbsp; 
                                {order.street} &nbsp; 
                                {order.zone_id} &nbsp; 
                                {order.city} &nbsp; 
                            </h6>
                            <p className= "order-date">
                            
                                {order.date}
                            </p>
                        <p className= "status">{order.order_status.toUpperCase()}</p>
                            <hr />
                            </div>

                        )
                    }
                )}
              

            </div>
            )
        }
        return (  
            <div>
                <div id= "sticky_element" className= "payment-header2">
               <p style={{width: '500px',paddingTop: '5%', color: 'white', fontSize: '15px'}}>
                    <img onClick={this.backToPrevPageHandler} src={backIcon} style={{float: 'left'}} alt= "float" />
                   &nbsp; &nbsp; History
                </p> 
                   
                </div> 
                <div className= "order-history">
                    {showOrder}
                    {showNoOrder}
                    {showReceipts}
                </div>
            </div>
        );
    }
}
 
export default errorHandler (History, axios);