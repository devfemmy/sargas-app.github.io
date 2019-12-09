import React, { Component } from 'react';
import {FormGroup, Input, Form, Button} from 'reactstrap'
import DatePicker from "react-datepicker";
import TimePicker from 'react-time-picker';
import "react-datepicker/dist/react-datepicker.css";
import SideDrawer from '../UI/SideDrawer/sideDrawer';
import menu from '../assets/menu.png'
import './refilSchedule.css';

class RefilSchedule extends Component {
    state = { 
        showSideDrawer : false,
        startDate: null,
        time: null,
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
        this.props.history.push({
          pathname: '/success'
        })
      
      }
    render() { 
        return ( 
            <div className= "Refill">
                <SideDrawer 
                open = {this.state.showSideDrawer}
                closed = {this.sideDrawerToggleHandler}
                />
                <h4 className= "">
                <strong><span onClick= {this.sideDrawerToggleHandler}>
                    <img src={menu} className="" alt="logo" />
                    </span>&nbsp;&nbsp;&nbsp;&nbsp;Home</strong>
                </h4>
                <div className="refil-container">
                    <h3>
                        Schedule A Refill
                    </h3>
                    <Form>
                        <div className = "date-time-picker">
                        <FormGroup>
                        <DatePicker
                            className='form-input2'
                            placeholderText = "Set Date"
                            selected={this.state.startDate}
                            onChange={this.handleChange}
                        />
                        </FormGroup>
                        <FormGroup>
                        <TimePicker
                            id = "time-picker"
                            className='form-input2'
                            hourPlaceholder = "Hour"
                            minutePlaceholder = "Min"
                            onChange={this.onChange}
                            value={this.state.time}
                            />
                        </FormGroup>
                        </div>
                       
                        <br />
                        <Button style= {{color: "white"}} 
                        outline color="secondary" 
                        className = "Refil-button" 
                        onClick= {this.pushToNextPage} 
                        size="lg">SET DELIVERY WINDOW</Button>
                    </Form>
                </div>
            </div>
         );
    }
}
 
export default RefilSchedule;