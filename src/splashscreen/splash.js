import React, { Component } from 'react';
import './splash.css';

class Splash extends Component {
    state = {  }
    componentDidMount () {
        setTimeout(() => {
           this.props.history.push({
               pathname: '/login'
           })
           
        }, 3000);
      
    }
    render() { 
        return ( 
            <div className= "splash-table">
               <div className= "splash-div">

               </div>
            </div>
         );
    }
}
 
export default Splash;