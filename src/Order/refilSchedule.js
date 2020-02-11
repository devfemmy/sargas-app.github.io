import React, { Component } from 'react';
import {FormGroup,  Form, Button} from 'reactstrap'
import DatePicker from "react-datepicker";
import TimePicker from 'rc-time-picker';
import "react-datepicker/dist/react-datepicker.css";
import 'rc-time-picker/assets/index.css';
import SideDrawer from '../UI/SideDrawer/sideDrawer';
import checkIcon from '../assets/clear.svg';
import './refilSchedule.css';
import trackImg from '../assets/track.png';
import axios from 'axios'
import Spinners from '../UI/Spinner/spinner';

class RefilSchedule extends Component {
    state = { 
        showSecond: false,
        showSideDrawer : false,
        startDate: new Date(),
        time: null,
        date_picked: null,
        use12Hours: true,
        loader: true
     }
     returnHome = () => {
        this.props.history.push(
            {pathname: '/home'}
        )
    }
    sideDrawerHandler = () => {
        this.setState({showSideDrawer: false})
     }

     sideDrawerToggleHandler = () => {
        this.setState((prevState) => {
        return {showSideDrawer: !prevState.showSideDrawer};
           });
     }
     handleChange = date => {
        this.setState({
          startDate: date
        });
      }
      onChange = time => this.setState({ time })
     pushToNextPage = () => {
        const date = document.querySelector('#date-picker').value;
        const time = document.querySelector('#time-picker').value;
        const scheduledtime = `${date} ${time}`
        // console.log(Scheduledtime)
        if ( this.state.time === null) {
            alert('time is not set')
        }
        else {
        this.setState({loader: false})
        const data = this.props.location.state.data;
        const data2 = this.props.location.state.data2;
        const data3 = this.props.location.state.data3;
        if (data3 === '4') {
            this.props.history.push({
                pathname: 'paystack',
                search: '?query=paystack',
                state: {data: data, data2: data2, payment_id: data3, scheduledtime: scheduledtime}
              })
        }else {
            console.log("cash payment")
            const data4 = {
                token : localStorage.getItem('token'),
                pm_id: data3,
                trans_ref_id: "A29o33",
                price: data,
                scheduled_time: scheduledtime,
                scheduled_status: "0",
                promo_code: "",
                cylinder_size: localStorage.getItem('cylinder_size')
            }
            // this.setState({loader: false})
            axios.post('http://sargasoms.com/api/customer/?API_flag=order', data4)
            .then(res => {
                this.setState({loader: false})
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
       

        


 
      
      }
    render() { 
        const state = this.props.location.state;
        console.log(state)
        let showRefill = <Spinners />
        if (this.state.loader) {
            showRefill = (
                <div className="refil-container">
                <h3>
                    Schedule A Refill
                </h3>
            <hr />
                <Form className= "form-picker">
                    <div className = "date-time-picker">
                    <FormGroup id= "form_grp">
                    <label className= "label" >Set Date: </label>
                    <DatePicker
                        id= 'date-picker'
                        value = {this.state.date_picked}
                        style = {{width: '100%'}}
                        className='form-input2'
                        selected={this.state.startDate}
                        onChange={this.handleChange}
                        dateFormat="MMMM d, yyyy"
                    />
                    </FormGroup>
            <hr />
                    <FormGroup id= "form_grp2">
                    <label className= "label" >Set Time: </label>
                    <TimePicker
                        id = "time-picker"
                        className='form-input2'
                        placeholder= "00 00"
                        use12Hours = {this.state.use12Hours}
                        showSecond = {this.state.showSecond}
                        onChange={this.onChange}
                        value={this.state.time}
                        />
                    </FormGroup>
            <hr />
                    </div>
                   
                    <br />
                  
                </Form>
            <div id= "form_grp3">
            <Button style= {{color: "white"}} 
                    outline color="secondary" 
                    className = "Refil-button" 
                    onClick= {this.pushToNextPage} 
                    size="lg">SET DELIVERY WINDOW</Button>
            </div>
               
            </div>
            )
        }
        return ( 
      
            <div className= "wrapper">
                <SideDrawer 
                open = {this.state.showSideDrawer}
                closed = {this.sideDrawerToggleHandler}
                />
            <div className= "order-header">
            <p className= "para-header"><span>
                    <img onClick={this.returnHome} src={checkIcon} className="" alt="logo" />
                    </span>&nbsp;&nbsp;&nbsp;&nbsp;Refill Schedule</p>
            
        
                  {/* <p className= "para-header"><span><strong>X</strong></span> &nbsp;&nbsp; Track Order</p> */}
            </div> 
   
            <div className= "counter">
                <img src={trackImg} className="Track-Img" alt="img" />   
            </div>
              
                <div className= "">
                    {showRefill}
                </div>
               
            </div>
         );
    }
}
 
export default RefilSchedule;