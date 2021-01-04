import React, { Component } from 'react';
import '../OrderSuccessful/orderSuccess.css';
import trackImg from '../../assets/track.png';
import './trackingPage.css';
import Timer from 'react-compound-timer';
import checkIcon from '../../assets/clear.svg';
import axios from 'axios'



class TrackingPage extends Component {
    state = { 
        showTimer: false,
        time: '',
        message: '',
        loading: true
     }
    returnHome = () => {
        this.props.history.push(
            {pathname: '/home'}
        )
    }
    componentDidMount () {
        const firstOrder = localStorage.getItem('order_id')
        const data2 = {
            token: localStorage.getItem('token'),
            order_id: firstOrder
        }
        axios.post('https://sargasoms.com/api/customer/?API_flag=getordertime', data2)
        .then(res => {
            if (res.data.status === 2001) {
                const message = res.data.message;
                this.setState({loading: true, message: message})
            }
            if (res.data.status === 1001) {
                const time = res.data.time
                this.setState({time: time, showTimer: true})
            }
  
            
        }).catch (err => {
            console.log(err)
        })
    }
    render() { 
        let showMessage = null;
        if (this.state.loading) {
            showMessage = (
                <div className= "show-msg">
                    <h5>{this.state.message}</h5>
                </div>
            )
        }
        let timer = null
        if (this.state.showTimer) {
            let hms = this.state.time; 
            let a = hms.split(':');
            const seconds = (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]); 
            const milliseconds = seconds * 1000;
            timer = (
                <div className= "timer">
                <h5>ETA</h5>
                <h2>
                <Timer
                initialTime={milliseconds}
                direction="backward">

       
                <Timer.Hours/>: <Timer.Minutes />: <Timer.Seconds />
       

                </Timer>
                </h2>
              
            </div>
            )
        }
        return (  
            <div className= "">
                <div className= "order-header">
                <p className= "para-header"><span>
                    <img onClick={this.returnHome} src={checkIcon} className="" alt="logo" />
                    </span>&nbsp;&nbsp;&nbsp;&nbsp;Track Order</p>
                </div> 
                <div className= "counter">
                <img src={trackImg} className="Track-Img" alt="img" />   
                </div>
               {timer}
               {showMessage}
            </div>
        );
    }
}
 
export default TrackingPage;