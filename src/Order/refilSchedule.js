import React, { Component } from 'react';
import {FormGroup, Label, Input, Form, Button} from 'reactstrap'
import SideDrawer from '../UI/SideDrawer/sideDrawer';
import menu from '../assets/menu.png'
import './refilSchedule.css';
class RefilSchedule extends Component {
    state = { 
        showSideDrawer : false
     }
    sideDrawerHandler = () => {
        this.setState({showSideDrawer: false})
     }

     sideDrawerToggleHandler = () => {
        this.setState((prevState) => {
        return {showSideDrawer: !prevState.showSideDrawer};
           });
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
                        <FormGroup>
                        <Input className='form-input' type="text" name="address" id="exampleEmail" placeholder="Set Date:" />
                        </FormGroup>
                        <FormGroup>
                        <Input className='form-input' type="text" name="text" placeholder="Set Time:" id="exampleSelect" />
                        </FormGroup>
                        <br />
                        <Button style= {{color: "white"}} 
                        outline color="secondary" 
                        className = "Refil-button"  
                        size="lg">SET DELIVERY WINDOW</Button>
                    </Form>
                </div>
            </div>
         );
    }
}
 
export default RefilSchedule;