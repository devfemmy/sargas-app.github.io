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

class RefilSchedule extends Component {
    state = { 
        showSecond: false,
        showSideDrawer : false,
        startDate: new Date(),
        time: null,
        date_picked: null,
        use12Hours: true
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
        const home_details = this.props.location.state.home_details
        // console.log(this.state.time)
        // console.log(this.state.date_picked)
        const date = document.querySelector('#date-picker').value;
        const time = document.querySelector('#time-picker').value;
        if ( this.state.time === null) {
            alert('time is not set')
        }else {
            console.log('going to pricing')
            this.props.history.push({
                pathname: 'pricing',
                search: '?query=pricing',
                state: {home_details: home_details, date: date, time: time}
              })
        }

        // this.props.history.push({
        //   pathname: '/success'
        // })
      
      }
    render() { 
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
                <Button style= {{color: "white", position: 'absolute', bottom: '8%', width: '80%'}} 
                        outline color="secondary" 
                        className = "Refil-button" 
                        onClick= {this.pushToNextPage} 
                        size="lg">SET DELIVERY WINDOW</Button>
                </div>
                   
                </div>
                </div>
               
            </div>
         );
    }
}
 
export default RefilSchedule;