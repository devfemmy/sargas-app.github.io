import React, { Component } from 'react';
import './tokenPage.css';
import {FormGroup, Label, Input, Form, Button} from 'reactstrap'
import logo from '../assets/sargas_new_logo2.png';
import axios from 'axios';
import errorHandler from '../ErrorHandler/errorHandler';
class PreviewPage extends Component {
    state = { 
      cylinder_size: [],
      error: false
     }
    pushToNextPage = () => {
      const home_details = this.props.location.state.home_details
        this.props.history.push({
          pathname: '/home',
          search: '?query=home',
          state: {home_details: home_details}
        })
      
      }
      componentDidMount () {
      const  data = {
          token: localStorage.getItem('token')
        }
        axios.post('http://sargasoms.com/api/customer/?API_flag=fetchstate', data)
        .then(res => {
          console.log(res)
          const response = res.data;
          if (response.status === 1001) {
            localStorage.setItem('state', response.data[0].state);
            localStorage.setItem('state_id', response.data[0].state_id);
          }
          const data2 = {
            token: localStorage.getItem('token'),
            state_id: localStorage.getItem('state_id')
          }
          axios.post('http://sargasoms.com/api/customer/?API_flag=fetchcity', data2)
          .then(
            res => {
              console.log(res)
              const response = res.data;
              if (response.status === 1001) {
                localStorage.setItem('city', response.data[0].city);
                localStorage.setItem('city_id', response.data[0].city_id);
              }
              const data3 = {
                token: localStorage.getItem('token'),
                city_id: localStorage.getItem('city_id')
              }
              axios.post('http://sargasoms.com/api/customer/?API_flag=fetchzone', data3)
              .then(
                res => {
                  console.log(res)
                  const response = res.data;
                  if (response.status === 1001) {
                    localStorage.setItem('zone', response.data[0].zone);
                    localStorage.setItem('zone_id', response.data[0].zone_id);
                  }
    
                }
              ).catch(  error => {
                   
                this.setState({error: true, loader: true})});

            }
          ).catch(  error => {
                   
            this.setState({error: true, loader: true})});
          // console.log(response.data[0].state,response.data[0].state_id )

        }).catch(  error => {
                   
          this.setState({error: true, loader: true})});
        axios.post('http://sargasoms.com/api/customer/?API_flag=fetchcylindersize', data)
        .then(
          (res) => {
            const response = res.data
            const cylinder_size = response.data;
            this.setState({cylinder_size: cylinder_size});
            console.log(res)
          }
        ).catch(  error => {
                   
          this.setState({error: true, loader: true})});

      }
    render() { 
      let customer_address = null;
      const state = localStorage.getItem('state');
      const city = localStorage.getItem('city');
      const zone = localStorage.getItem('zone');
      // customer_address = city + " " + zone + " " + state;
      customer_address = `${city}, ${zone}, ${state}`
      localStorage.setItem('customer_address', customer_address)
        return ( 
            <div className = "preview2">
                <span className = "arrow-back"></span>
                <header className= "token-header">
                <img src={logo} className="Special-logo" alt="logo" />   
                </header>
            <div className = "preview-body">
            <Form>
                        <FormGroup>
                        <Label className= "preview-label" for="exampleSelect">Select Cylinder Size:</Label>
                        <Input type="select" name="select" id="exampleSelect">
                          {this.state.cylinder_size.map(
                            (size, id) => {
                              localStorage.setItem('cylinder_size', size.size)
                              return (
                                <option id="cylinder" key = {id}>{size.size}</option>
                              )
                            }
                          )}
                       
                        
                        </Input>
                    </FormGroup>
                    <br />
                    <Button style= {{color: "white", position: 'absolute', bottom: '45%', width: '80%', border: '2px solid white'}} 
                    outline color="secondary" 
                    onClick= {this.pushToNextPage}
                    className = "Login-button2"  
                    size="lg">SUBMIT</Button>
            </Form>
                
            </div>
            </div>
         );
    }
}
 
export default errorHandler(PreviewPage, axios);