import React, { Component } from 'react';
import './tokenPage.css';
import {FormGroup, Label, Input, Form, Button} from 'reactstrap'
import axios from 'axios';
import errorHandler from '../ErrorHandler/errorHandler';
import Spinners from '../UI/Spinner/spinner';
class PreviewPage extends Component {
    state = { 
      cylinder_size: [],
      error: false,
      loader: false,
      zone: [], 
      state: [],
      city: []
     }
    pushToNextPage = () => {
      // const home_details = this.props.location.state.home_details
        this.props.history.push({
          pathname: '/home',
        })
      
      }
      componentDidMount () {
      const  data = {
          token: localStorage.getItem('token')
        }
        axios.post('https://sargasoms.com/api/customer/?API_flag=fetchstate', data)
        .then(res => {
          console.log(res)
          const response = res.data;
          const state = response.data;
          this.setState({state: state});
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
              const city = response.data;
              this.setState({city: city});
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
                  const zone = response.data;
                  this.setState({zone: zone, loader: true});
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
            this.setState({cylinder_size: cylinder_size,});
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
      localStorage.setItem('customer_address', customer_address);


      let showPrev = <Spinners />
      if (this.state.loader) {
        showPrev = (
          <div className= "preview-body-header">
                        <Form>
                        <FormGroup>
                        <Label className= "preview-label" for="exampleSelect">Select Cylinder Size:</Label>
                        <Input type="select" name="select" id="exampleSelect">
                          {this.state.cylinder_size.map(
                            (size, id) => {
                              localStorage.setItem('cylinder_size', size.size_id)
                              return (
                                <option id="cylinder" key = {id}>{size.size}</option>
                              )
                            }
                          )}
                       
                        
                        </Input>
                        <Label className= "preview-label" for="exampleSelect">Select City:</Label>
                        <Input type="select" name="select" id="city">
                          {this.state.city.map(
                            (city, id) => {
                              localStorage.setItem('sargas_city', city.city)
                              return (
                                <option  key = {id}>{city.city}</option>
                              )
                            }
                          )}
                       
                        
                        </Input>
                        <Label className= "preview-label" for="exampleSelect">Select State:</Label>
                        <Input type="select" name="select" id="state" >
                          {this.state.state.map(
                            (state, id) => {
                              localStorage.setItem('sargas_state', state.state)
                              return (
                                <option key = {id}>{state.state}</option>
                              )
                            }
                          )}
                       
                        
                        </Input>
                        <Label className= "preview-label" for="exampleSelect">Select Zone:</Label>
                        <Input type="select" name="select" id="zone">
                          {this.state.zone.map(
                            (zone, id) => {
                              localStorage.setItem('sargas_zone', zone.zone)
                              return (
                                <option key = {id}>{zone.zone}</option>
                              )
                            }
                          )}
                       
                        
                        </Input>
                    </FormGroup>
                    <Button style= {{color: "green", width: '100%', border: 'none', background: 'white'}} 
                    outline color="secondary" 
                    onClick= {this.pushToNextPage}
                    className = "Login-button2"  
                    size="lg">SUBMIT</Button>
            </Form>
          </div>
        )
      }
      // if (this.state.loader === true && this.state.zone !== '') {
      //   const city1 = document.querySelector('#city').value;
      //   const state2 = document.querySelector('#state').value;
      //   const zone3 = document.querySelector('#zone').value;
      //   console.log('city', city1, state2, zone3)
      // }
        return ( 
            <div className = "preview2">
            <div className = "preview-body">
              {showPrev}
                
            </div>
            </div>
         );
    }
}
 
export default errorHandler(PreviewPage, axios);