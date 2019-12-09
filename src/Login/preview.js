import React, { Component } from 'react';
import './tokenPage.css';
import {FormGroup, Label, Input, Form, Button} from 'reactstrap'
import logo from '../assets/logo.png';
class Preview extends Component {
    state = {  }
    render() { 
        return ( 
            <div className = "preview">
                <span className = "arrow-back">&larr;</span>
                <header className= "token-header">
                <img src={logo} className="Special-logo" alt="logo" />   
                </header>
            <hr />
            <div className = "preview-body">
            <Form>
                        <FormGroup>
                        <Label for="exampleEmail">Preferred Delivery Address</Label>
                        <Input type="text" name="address" id="exampleEmail" placeholder="Preferred Delivery Address" />
                        </FormGroup>
                        <FormGroup>
                        <Label for="exampleSelect">Select your Cylinder Size</Label>
                        <Input type="select" name="select" id="exampleSelect">
                        <option>15kg</option>
                        <option>20kg</option>
                        <option>30kg</option>
                        <option>40kg</option>
                        <option>50kg</option>
                        </Input>
                    </FormGroup>
                    <br />
                    <Button style= {{color: "green"}} 
                    outline color="secondary" 
                    className = "Login-button"  
                    size="lg">SUBMIT</Button>
            </Form>
                
            </div>
            </div>
         );
    }
}
 
export default Preview;